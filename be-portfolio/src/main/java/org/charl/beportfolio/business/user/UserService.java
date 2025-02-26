package org.charl.beportfolio.business.user;


import org.charl.beportfolio.presentation.user.UserRequestModel;
import org.charl.beportfolio.presentation.user.UserResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserService {

    Mono<UserResponseModel> addUserFromAuth0(String auth0UserId);
    Mono<UserResponseModel> syncUserWithAuth0(String auth0UserId);
    Mono<UserResponseModel> getUserByUserId(String userId);
    Flux<UserResponseModel> getAllUsers();
    Mono<UserResponseModel> updateUser(UserRequestModel userRequestModel, String userId);
}

