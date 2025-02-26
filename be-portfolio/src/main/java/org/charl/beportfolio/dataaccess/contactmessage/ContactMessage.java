package org.charl.beportfolio.dataaccess.contactmessage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "contact_messages")
public class ContactMessage {
    @Id
    private String id;

    private String contactMessageId;
    private String firstName;
    private String lastName;
    private String email;
    private String subject;
    private String message;
    private LocalDateTime sentAt;
}

