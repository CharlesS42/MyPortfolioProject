package org.charl.beportfolio.business.user;

import org.charl.beportfolio.dataaccess.user.User;
import org.charl.beportfolio.presentation.user.UserRequestModel;
import org.charl.beportfolio.presentation.user.UserResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserService {
    Flux<UserResponseModel> getAllUsers();

    Mono<UserResponseModel> getUserById(String id);

    Mono<UserResponseModel> addUser(UserRequestModel userRequestModel);

    Mono<UserResponseModel> updateUser(String id, UserRequestModel userRequestModel);

    Mono<Void> deleteUser(String id);

    Mono<UserResponseModel> getUserByEmail(String email);
}

