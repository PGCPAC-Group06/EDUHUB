package com.eduhub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopRatedInstituteDTO {
    private String name;
    private Double rating;
    private List<TopRatedInstituteDTO> tiedInstitutes;

    public TopRatedInstituteDTO(String name, Double rating) {
        this.name = name;
        this.rating = rating;
    }
}
