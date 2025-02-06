package org.charl.beportfolio.business.contactmessage;

import org.charl.beportfolio.presentation.contactmessage.ContactMessageRequestModel;
import org.charl.beportfolio.presentation.contactmessage.ContactMessageResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ContactMessageService {
    Flux<ContactMessageResponseModel> getAllContactMessages();
    Mono<ContactMessageResponseModel> getContactMessageById(String contactMessageId);
    Mono<ContactMessageResponseModel> addContactMessage(ContactMessageRequestModel contactMessageRequestModel);
    Mono<Void> deleteContactMessage(String contactMessageId);
}
