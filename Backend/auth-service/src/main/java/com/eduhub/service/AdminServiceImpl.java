package com.eduhub.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eduhub.dto.PendingInstituteResponse;
import com.eduhub.entity.ApprovalStatus;
import com.eduhub.entity.InstituteProfile;
import com.eduhub.entity.User;
import com.eduhub.repository.InstituteProfileRepository;
import com.eduhub.repository.UserRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InstituteProfileRepository instituteProfileRepository;

    @Override
    public String approveInstitute(Integer userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Institute not found"));

        user.setApprovalStatus(ApprovalStatus.APPROVED);

        userRepository.save(user);

        return "Institute Approved Successfully";
    }

    @Override
    public String rejectInstitute(Integer userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Institute not found"));

        user.setApprovalStatus(ApprovalStatus.REJECTED);

        userRepository.save(user);

        return "Institute Rejected Successfully";
    }

    @Override
    public List<PendingInstituteResponse> getPendingInstitutes() {

        List<User> pendingUsers = userRepository
                .findByApprovalStatusAndRole_RoleNameContainingIgnoreCase(
                        ApprovalStatus.PENDING,
                        "institute"
                );

        return pendingUsers.stream()
                .map(user -> {
                    Optional<InstituteProfile> profileOpt = instituteProfileRepository.findByUser(user);
                    String contact = profileOpt.map(InstituteProfile::getContactNo).orElse("");
                    String address = profileOpt.map(InstituteProfile::getAddress).orElse("");
                    String gstin = profileOpt.map(InstituteProfile::getGstin).orElse("");

                    return new PendingInstituteResponse(
                            user.getUserId(),
                            user.getName(),
                            user.getEmail(),
                            contact,
                            address,
                            gstin,
                            user.getApprovalStatus().name(),
                            user.getCreatedAt()
                    );
                })
                .collect(Collectors.toList());
    }
}