package org.charl.beportfolio.presentation.contactmessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.charl.beportfolio.business.contactmessage.ContactMessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/messages")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ContactMessageResponseModel> getAllMessages() {
        log.info("Fetching all messages");
        return contactMessageService.getAllContactMessages();
    }

    @GetMapping(value = "/{messageId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<ContactMessageResponseModel>> getMessageById(@PathVariable String messageId) {
        log.info("Fetching message with id: {}", messageId);
        return contactMessageService.getContactMessageById(messageId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<ContactMessageResponseModel> addMessage(@RequestBody ContactMessageRequestModel messageRequestModel) {
        log.info("Adding new message");
        return contactMessageService.addContactMessage(messageRequestModel);
    }

    @DeleteMapping(value = "/{messageId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteMessage(@PathVariable String messageId) {
        log.info("Deleting message with id: {}", messageId);
        return contactMessageService.deleteContactMessage(messageId);
    }
}

