package org.charl.beportfolio.presentation.cv;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CVResponseModel {
    private String cvId;
    private String fileName;
    private String fileUrl;
    private LocalDate uploadedAt;
}

