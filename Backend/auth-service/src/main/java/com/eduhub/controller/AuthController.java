package com.eduhub.controller;

import java.time.Duration;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.eduhub.dto.LoginRequest;
import com.eduhub.dto.LoginResponse;
import com.eduhub.dto.RegisterRequest;
import com.eduhub.entity.User;
import com.eduhub.repository.UserRepository;
import com.eduhub.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        String token = response.getToken();

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofHours(1))
                .sameSite("Lax")
                .build();

        response.setToken(null);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    @PutMapping("/password")
    public ResponseEntity<String> changePassword(
            jakarta.servlet.http.HttpServletRequest httpRequest,
            @Valid @RequestBody com.eduhub.dto.ChangePasswordRequest request) {
        try {
            Integer userId = (Integer) httpRequest.getAttribute("userId");
            if (userId == null) {
                return ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED).body("Unauthorized");
            }
            authService.changePassword(userId, request);
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logout Successful");
    }

    @GetMapping("/debug/hash/{email}")
    public ResponseEntity<String> debugHash(@PathVariable("email") String email) {
        Optional<User> opt = userRepository.findByEmail(email);
        if(opt.isPresent()) {
            String hash = opt.get().getPassword();
            boolean matchesRoot = passwordEncoder.matches("root", hash);
            return ResponseEntity.ok("Hash: " + hash + " | Length: " + hash.length() + " | Matches 'root': " + matchesRoot);
        }
        return ResponseEntity.notFound().build();
    }
}