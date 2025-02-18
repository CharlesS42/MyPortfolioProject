package org.charl.beportfolio.auth0;


import org.charl.beportfolio.auth0.models.Auth0UserResponseModel;
import org.charl.beportfolio.presentation.user.UserResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface Auth0Service {

    Mono<UserResponseModel> getUserById(String auth0UserId);
    Mono<Void> assignRoleToUser(String auth0UserId, String roleName);
}
