package com.eduhub.service;



import com.eduhub.dto.LoginRequest;
import com.eduhub.dto.LoginResponse;
import com.eduhub.dto.RegisterRequest;


public interface AuthService {
    
	String register(RegisterRequest registerRequest);

    LoginResponse login(LoginRequest loginRequest);
}
