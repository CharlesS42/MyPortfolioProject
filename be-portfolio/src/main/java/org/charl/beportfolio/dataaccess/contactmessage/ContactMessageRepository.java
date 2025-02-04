package org.charl.beportfolio.dataaccess.contactmessage;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface ContactMessageRepository extends ReactiveMongoRepository<ContactMessage, String> {
    Mono<ContactMessage> findContactMessageByContactMessageId(String contactMessageId);
}