package com.eduhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eduhub.dto.PendingInstituteResponse;
import com.eduhub.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping({"/institutes/pending", "/pending-institutes"})
    public List<PendingInstituteResponse> getPendingInstitutes() {
        return adminService.getPendingInstitutes();
    }
    
    @PutMapping({"/institutes/{id}/approve", "/approve/{id}"})
    public String approveInstitute(@PathVariable Integer id) {
        return adminService.approveInstitute(id);
    }
    
    @PutMapping({"/institutes/{id}/reject", "/reject/{id}"})
    public String rejectInstitutePut(@PathVariable Integer id) {
        return adminService.rejectInstitute(id);
    }

    @DeleteMapping({"/institutes/{id}/reject", "/reject/{id}"})
    public String rejectInstituteDelete(@PathVariable Integer id) {
        return adminService.rejectInstitute(id);
    }
}