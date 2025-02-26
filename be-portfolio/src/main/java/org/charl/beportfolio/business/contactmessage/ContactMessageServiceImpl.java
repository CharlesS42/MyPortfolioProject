package org.charl.beportfolio.business.contactmessage;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.charl.beportfolio.dataaccess.contactmessage.ContactMessageRepository;
import org.charl.beportfolio.presentation.contactmessage.ContactMessageRequestModel;
import org.charl.beportfolio.presentation.contactmessage.ContactMessageResponseModel;
import org.charl.beportfolio.utils.entitymodelutils.ContactMessageEntityModelUtil;
import org.charl.beportfolio.utils.exceptions.NotFoundException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
@Slf4j
public class ContactMessageServiceImpl implements ContactMessageService {

    private final JavaMailSender mailSender;
    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageServiceImpl(JavaMailSender mailSender, ContactMessageRepository contactMessageRepository) {
        this.mailSender = mailSender;
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

    @Override
    public Mono<ContactMessageResponseModel> sendContactMessageEmail(ContactMessageRequestModel contactMessageRequestModel) {
        return Mono.fromCallable(() -> {
            MimeMessage mailMessage = mailSender.createMimeMessage();
            String htmlContent = loadHtmlTemplate("contact-me-email.html", contactMessageRequestModel.getFirstName(), contactMessageRequestModel.getLastName(), contactMessageRequestModel.getEmail(), contactMessageRequestModel.getSubject(), contactMessageRequestModel.getMessage());

            MimeMessageHelper helper = new MimeMessageHelper(mailMessage, true);
            helper.setTo("charles.seg42@gmail.com");
            helper.setSubject("Portfolio Contact Message: " + contactMessageRequestModel.getSubject());
            helper.setText(htmlContent, true);
            helper.setFrom("charles.portfolio.notifications@gmail.com");

            mailSender.send(mailMessage);

            return null;
        }).then(addContactMessage(contactMessageRequestModel));
    }

    private String loadHtmlTemplate(String templateName, String... templateArgs) {
        ClassPathResource resource = new ClassPathResource("email-templates/" + templateName);

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {
            StringBuilder content = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }

            String htmlContent = content.toString();
            for (int i = 0; i < templateArgs.length; i++) {
                htmlContent = htmlContent.replace("{{arg" + i + "}}", templateArgs[i]);
            }

            return htmlContent;
        } catch (IOException e) {
            throw new RuntimeException("Error loading email template: " + templateName, e);
        }
    }
}
