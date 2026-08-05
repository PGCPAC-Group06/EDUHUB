package com.eduhub.service;



import com.eduhub.dto.LoginRequest;
import com.eduhub.dto.LoginResponse;
import com.eduhub.dto.RegisterRequest;
import com.eduhub.dto.ChangePasswordRequest;
import com.eduhub.entity.User;


public interface AuthService {
    
	String register(RegisterRequest registerRequest);

    LoginResponse login(LoginRequest loginRequest);
    
    void changePassword(Integer userId, ChangePasswordRequest request);
    
}
