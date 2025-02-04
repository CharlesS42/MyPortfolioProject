package org.charl.beportfolio.dataaccess.cv;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "cv")
public class CV {
    @Id
    private String id;

    private String cvId;
    private String fileName;
    private String fileUrl;
    private LocalDate uploadedAt;
}

