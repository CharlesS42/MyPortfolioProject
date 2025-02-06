package org.charl.beportfolio.business.contactmessage;

import lombok.extern.slf4j.Slf4j;
import org.charl.beportfolio.dataaccess.contactmessage.ContactMessageRepository;
import org.charl.beportfolio.presentation.contactmessage.ContactMessageRequestModel;
import org.charl.beportfolio.presentation.contactmessage.ContactMessageResponseModel;
import org.charl.beportfolio.utils.entitymodelutils.ContactMessageEntityModelUtil;
import org.charl.beportfolio.utils.exceptions.NotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class ContactMessageServiceImpl implements ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageServiceImpl(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @Override
    public Flux<ContactMessageResponseModel> getAllContactMessages() {
        return contactMessageRepository.findAll()
                .map(ContactMessageEntityModelUtil::toContactMessageResponseModel);
    }

    @Override
    public Mono<ContactMessageResponseModel> getContactMessageById(String contactMessageId) {
        return contactMessageRepository.findContactMessageByContactMessageId(contactMessageId)
                .switchIfEmpty(Mono.error(new NotFoundException("Contact message id not found: " + contactMessageId)))
                .map(ContactMessageEntityModelUtil::toContactMessageResponseModel);
    }

    @Override
    public Mono<ContactMessageResponseModel> addContactMessage(ContactMessageRequestModel contactMessageRequestModel) {
        return contactMessageRepository.save(ContactMessageEntityModelUtil.toContactMessageEntity(contactMessageRequestModel))
                .map(ContactMessageEntityModelUtil::toContactMessageResponseModel);
    }

    @Override
    public Mono<Void> deleteContactMessage(String contactMessageId) {
        return contactMessageRepository.findContactMessageByContactMessageId(contactMessageId)
                .switchIfEmpty(Mono.error(new NotFoundException("Contact message id not found: " + contactMessageId)))
                .flatMap(contactMessageRepository::delete);
    }
}
