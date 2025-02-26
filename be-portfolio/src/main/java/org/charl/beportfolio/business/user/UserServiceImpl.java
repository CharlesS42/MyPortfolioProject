package org.charl.beportfolio.business.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.charl.beportfolio.auth0.Auth0Service;
import org.charl.beportfolio.dataaccess.user.User;
import org.charl.beportfolio.dataaccess.user.UserRepository;
import org.charl.beportfolio.presentation.user.UserRequestModel;
import org.charl.beportfolio.presentation.user.UserResponseModel;
import org.charl.beportfolio.utils.entitymodelutils.UserEntityModelUtil;
import org.charl.beportfolio.utils.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final Auth0Service auth0Service;
    private final UserRepository userRepository;

    @Value("${frontend.domain}")
    private String baseUrl;

    @Override
    public Mono<UserResponseModel> addUserFromAuth0(String auth0UserId) {
        return auth0Service.getUserById(auth0UserId)
                .switchIfEmpty(Mono.error(new NotFoundException("User not found with Auth0 ID: " + auth0UserId)))
                .flatMap(auth0User ->
                        userRepository.findByUserId(auth0UserId)
                                .switchIfEmpty(
                                        auth0Service.assignRoleToUser(auth0UserId, "rol_JoF7xMZnCZhfS6Ze")
                                                .doOnSuccess(unused -> log.info("Successfully assigned 'Admin' role to User ID: {}", auth0UserId))
                                                .doOnError(error -> log.error("Failed to assign 'Admin' role to User ID: {}", auth0UserId, error))
                                                .then(auth0Service.getUserById(auth0UserId)
                                                        .doOnSuccess(updatedAuth0User -> log.info("Updated Auth0 User Details After Role Assignment: {}", updatedAuth0User))
                                                        .flatMap(updatedAuth0User -> {
                                                            String travelerId = UUID.randomUUID().toString();
                                                            return userRepository.save(
                                                                            User.builder()
                                                                                    .userId(auth0UserId)
                                                                                    .email(updatedAuth0User.getEmail())
                                                                                    .firstName(updatedAuth0User.getFirstName())
                                                                                    .lastName(updatedAuth0User.getLastName())
                                                                                    .roles(updatedAuth0User.getRoles())
                                                                                    .permissions(updatedAuth0User.getPermissions())
                                                                                    .build()
                                                                    )
                                                                    .doOnSuccess(user -> {
                                                                        log.info("User successfully created in MongoDB: {}", user);
                                                                    });
                                                        })
                                                )
                                )
                )
                .map(UserEntityModelUtil::toUserResponseModel)
                .doOnSuccess(user -> log.info("Final User Response: {}", user))
                .doOnError(error -> log.error("Error processing user with ID: {}", auth0UserId, error));
    }

    @Override
    public Mono<UserResponseModel> syncUserWithAuth0(String auth0UserId) {
        log.info("Starting user sync process for Auth0 User ID: {}", auth0UserId);

        return auth0Service.getUserById(auth0UserId)
                .doOnSuccess(auth0User -> log.info("Fetched Auth0 User Details: {}", auth0User))
                .flatMap(auth0User -> userRepository.findByUserId(auth0UserId)
                        .flatMap(existingUser -> {
                            log.info("Existing User Found in Database: {}", existingUser);

                            // Update User Fields
                            existingUser.setEmail(auth0User.getEmail());
                            existingUser.setFirstName(auth0User.getFirstName());
                            existingUser.setLastName(auth0User.getLastName());
                            existingUser.setRoles(auth0User.getRoles());
                            existingUser.setPermissions(auth0User.getPermissions());

                            log.info("Updated User Details Before Saving: {}", existingUser);

                            return userRepository.save(existingUser)
                                    .doOnSuccess(updatedUser -> log.info("Successfully Synced User in MongoDB: {}", updatedUser))
                                    .doOnError(error -> log.error("Failed to Save Synced User to MongoDB: {}", error.getMessage()));
                        })
                        .switchIfEmpty(Mono.error(new RuntimeException("User Not Found in Database: " + auth0UserId)))
                )
                .map(UserEntityModelUtil::toUserResponseModel)
                .doOnSuccess(user -> log.info("Final Synced User Response: {}", user))
                .doOnError(error -> log.error("Error Syncing User with ID {}: {}", auth0UserId, error.getMessage()));
    }

    @Override
    public Mono<UserResponseModel> getUserByUserId(String userId) {
        return userRepository.findByUserId(userId)
                .map(UserEntityModelUtil::toUserResponseModel)
                .doOnSuccess(user -> log.info("Fetched User Details: {}", user))
                .doOnError(error -> log.error("Error fetching user with ID: {}", userId, error));
    }

    @Override
    public Flux<UserResponseModel> getAllUsers() {
        return userRepository.findAll()
                .map(UserEntityModelUtil::toUserResponseModel)
                .doOnNext(user -> log.info("Fetched User Details: {}", user))
                .doOnError(error -> log.error("Error fetching users: {}", error));
    }

    @Override
    public Mono<UserResponseModel> updateUser(UserRequestModel userRequestModel, String userId) {
        return null;
    }

}

