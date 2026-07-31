package com.eduhub.service;

import java.util.List;
import com.eduhub.dto.InstructorDTO;

public interface InstructorService {
    InstructorDTO createInstructor(InstructorDTO dto);
    InstructorDTO updateInstructor(Integer instructorId, InstructorDTO dto);
    void deleteInstructor(Integer instructorId);
    List<InstructorDTO> getInstructorsByInstituteUserId(Integer instituteUserId);
}
