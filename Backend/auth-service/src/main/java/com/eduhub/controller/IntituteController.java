package com.eduhub.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/institute")
public class IntituteController {
   
	 @GetMapping
	 public String test(){

	        return "Institute Access Granted";
	  }
}
