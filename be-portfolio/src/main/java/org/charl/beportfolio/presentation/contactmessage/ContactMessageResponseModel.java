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
public class ContactMessageResponseModel {
    private String contactMessageId;
    private String name;
    private String email;
    private String message;
    private LocalDateTime sentAt;
}

