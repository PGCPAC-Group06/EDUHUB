package com.eduhub.dto;

public class LoginResponse {

    private Integer userId;
    private String name;
    private String email;
    private String role;
    private String token;
    private UserData user;

    public static class UserData {
        private Integer userId;
        private String name;
        private String email;
        private String role;

        public UserData() {
            super();
        }

        public UserData(Integer userId, String name, String email, String role) {
            super();
            this.userId = userId;
            this.name = name;
            this.email = email;
            this.role = role;
        }

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }

    public LoginResponse() {
        super();
    }

    public LoginResponse(Integer userId, String name, String email, String role, String token) {
        super();
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
        this.token = token;
        this.user = new UserData(userId, name, email, role);
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
        if (this.user == null) {
            this.user = new UserData();
        }
        this.user.setUserId(userId);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
        if (this.user == null) {
            this.user = new UserData();
        }
        this.user.setName(name);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
        if (this.user == null) {
            this.user = new UserData();
        }
        this.user.setEmail(email);
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
        if (this.user == null) {
            this.user = new UserData();
        }
        this.user.setRole(role);
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserData getUser() {
        return user;
    }

    public void setUser(UserData user) {
        this.user = user;
    }
}