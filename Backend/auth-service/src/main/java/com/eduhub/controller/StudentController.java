package com.eduhub.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("api/student")
@CrossOrigin(origins = "*")
public class StudentController {
   
	@GetMapping
    public String test(){

        return "Student Access Granted";
    }
	
}
