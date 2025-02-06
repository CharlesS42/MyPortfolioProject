package org.charl.beportfolio.business.user;

import lombok.extern.slf4j.Slf4j;
import org.charl.beportfolio.dataaccess.user.User;
import org.charl.beportfolio.dataaccess.user.UserRepository;
import org.charl.beportfolio.presentation.user.UserRequestModel;
import org.charl.beportfolio.presentation.user.UserResponseModel;
import org.charl.beportfolio.utils.entitymodelutils.UserEntityModelUtil;
import org.charl.beportfolio.utils.exceptions.NotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Flux<UserResponseModel> getAllUsers() {
        return userRepository.findAll()
                .map(UserEntityModelUtil::toUserResponseModel);
    }

    @Override
    public Mono<UserResponseModel> getUserById(String userId) {
        return userRepository.findUserByUserId(userId)
                .switchIfEmpty(Mono.error(new NotFoundException("User userId not found: " + userId)))
                .map(UserEntityModelUtil::toUserResponseModel);
    }

    @Override
    public Mono<UserResponseModel> addUser(UserRequestModel userRequestModel) {
        return userRepository.save(UserEntityModelUtil.toUserEntity(userRequestModel))
                .doOnSuccess(savedUser -> log.info("Saved user: {}", savedUser))
                .map(UserEntityModelUtil::toUserResponseModel);
    }

    @Override
    public Mono<UserResponseModel> updateUser(String userId, UserRequestModel userRequestModel) {
        return userRepository.findUserByUserId(userId)
                .switchIfEmpty(Mono.error(new NotFoundException("User userId not found: " + userId)))
                .flatMap(foundUser -> {
                    foundUser.setFullName(userRequestModel.getFullName());
                    foundUser.setEmail(userRequestModel.getEmail());
                    foundUser.setRole(userRequestModel.getRole());
                    foundUser.setCompany(userRequestModel.getCompany());
                    return userRepository.save(foundUser);
                })
                .doOnSuccess(updatedUser -> log.info("Updated user: {}", updatedUser))
                .map(UserEntityModelUtil::toUserResponseModel);
    }

    @Override
    public Mono<Void> deleteUser(String userId) {
        return userRepository.findUserByUserId(userId)
                .switchIfEmpty(Mono.error(new NotFoundException("User id not found: " + userId)))
                .flatMap(userRepository::delete)
                .doOnSuccess(unused -> log.info("Deleted user with id: {}", userId));
    }

    @Override
    public Mono<UserResponseModel> getUserByEmail(String email) {
        return userRepository.findUserByEmail(email)
                .switchIfEmpty(Mono.error(new NotFoundException("User email not found: " + email)))
                .map(UserEntityModelUtil::toUserResponseModel);
    }

}
