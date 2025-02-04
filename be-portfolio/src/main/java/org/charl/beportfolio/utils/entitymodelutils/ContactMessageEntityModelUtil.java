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

        if (message.getName() != null) {
            contactMessageResponseModel.setName(message.getName());
        }
        if (message.getEmail() != null) {
            contactMessageResponseModel.setEmail(message.getEmail());
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
                .id(generateUUIDString()) // Generate a unique messageId
                .name(messageRequestModel.getName())
                .email(messageRequestModel.getEmail())
                .message(messageRequestModel.getMessage())
                .sentAt(LocalDateTime.now())
                .build();
    }

    // Utility method to generate a UUID string
    private static String generateUUIDString() {
        return java.util.UUID.randomUUID().toString();
    }
}

