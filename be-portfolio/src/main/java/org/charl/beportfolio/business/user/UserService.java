package org.charl.beportfolio.business.user;

import org.charl.beportfolio.dataaccess.user.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserService {
    Flux<User> getAllUsers();

    Mono<User> getUserById(String id);

    Mono<User> addUser(User user);

    Mono<User> updateUser(String id, User user);

    Mono<Void> deleteUser(String id);

    Mono<User> getUserByEmail(String email);
}

