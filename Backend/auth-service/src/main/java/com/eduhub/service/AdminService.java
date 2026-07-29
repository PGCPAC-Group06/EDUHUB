package com.eduhub.service;

import java.util.List;

import com.eduhub.dto.PendingInstituteResponse;

public interface AdminService {

    List<PendingInstituteResponse> getPendingInstitutes();

    String approveInstitute(Integer userId);

    String rejectInstitute(Integer userId);

}