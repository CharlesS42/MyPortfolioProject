package org.charl.beportfolio.presentation.contactmessage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessageRequestModel {
    private String name;
    private String email;
    private String message;
    private LocalDateTime sentAt;
}

