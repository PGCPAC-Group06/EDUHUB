package com.eduhub.dto;



import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadDocumentRequest {

    @NotBlank(message = "Document type is required")
    private String documentType;

    @NotBlank(message = "Document name is required")
    private String documentName;

    @NotBlank(message = "Document URL is required")
    private String documentUrl;
}