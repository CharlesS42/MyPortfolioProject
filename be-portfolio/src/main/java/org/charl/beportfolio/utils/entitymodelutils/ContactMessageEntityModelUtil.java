package org.charl.beportfolio.utils.entitymodelutils;

import org.charl.beportfolio.dataaccess.contactmessage.ContactMessage;
import org.charl.beportfolio.presentation.contactmessage.ContactMessageRequestModel;
import org.charl.beportfolio.presentation.contactmessage.ContactMessageResponseModel;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;

public class ContactMessageEntityModelUtil {

    // Method to convert a ContactMessage entity to a ContactMessageResponseModel
    public static ContactMessageResponseModel toContactMessageResponseModel(ContactMessage message) {
        ContactMessageResponseModel contactMessageResponseModel = new ContactMessageResponseModel();
        BeanUtils.copyProperties(message, contactMessageResponseModel);

        if (message.getContactMessageId() != null) {
            contactMessageResponseModel.setContactMessageId(message.getContactMessageId());
        }
        if (message.getFirstName() != null) {
            contactMessageResponseModel.setFirstName(message.getFirstName());
        }
        if (message.getLastName() != null) {
            contactMessageResponseModel.setLastName(message.getLastName());
        }
        if (message.getEmail() != null) {
            contactMessageResponseModel.setEmail(message.getEmail());
        }
        if (message.getSubject() != null) {
            contactMessageResponseModel.setSubject(message.getSubject());
        }
        if (message.getMessage() != null) {
            contactMessageResponseModel.setMessage(message.getMessage());
        }
        if (message.getSentAt() != null) {
            contactMessageResponseModel.setSentAt(message.getSentAt());
        }

        return contactMessageResponseModel;
    }

    // Method to map a ContactMessageRequestModel to a ContactMessage entity
    public static ContactMessage toContactMessageEntity(ContactMessageRequestModel messageRequestModel) {
        return ContactMessage.builder()
                .contactMessageId(generateUUIDString()) // Generate a unique messageId
                .firstName(messageRequestModel.getFirstName())
                .lastName(messageRequestModel.getLastName())
                .email(messageRequestModel.getEmail())
                .subject(messageRequestModel.getSubject())
                .message(messageRequestModel.getMessage())
                .sentAt(LocalDateTime.now())
                .build();
    }

    // Utility method to generate a UUID string
    private static String generateUUIDString() {
        return java.util.UUID.randomUUID().toString();
    }
}

