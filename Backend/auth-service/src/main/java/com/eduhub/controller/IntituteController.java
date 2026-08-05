package com.eduhub.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("api/institute")
@CrossOrigin(origins = "*")
public class IntituteController {
   
	 @GetMapping
	 public String test(){

	        return "Institute Access Granted";
	  }
}
