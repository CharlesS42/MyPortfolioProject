package org.charl.beportfolio.utils.entitymodelutils;

import org.charl.beportfolio.dataaccess.user.User;
import org.charl.beportfolio.presentation.user.UserRequestModel;
import org.charl.beportfolio.presentation.user.UserResponseModel;
import org.springframework.beans.BeanUtils;

public class UserEntityModelUtil {

    // Method to convert a User entity to a UserResponseModel
    public static UserResponseModel toUserResponseModel(User user) {
        UserResponseModel userResponseModel = new UserResponseModel();
        BeanUtils.copyProperties(user, userResponseModel);

        if (user.getFullName() != null) {
            userResponseModel.setFullName(user.getFullName());
        }
        if (user.getEmail() != null) {
            userResponseModel.setEmail(user.getEmail());
        }
        if (user.getCompany() != null) {
            userResponseModel.setCompany(user.getCompany());
        }
        if (user.getRole() != null) {
            userResponseModel.setRole(user.getRole());
        }

        return userResponseModel;
    }

    // Method to map a UserRequestModel to a User entity
    public static User toUserEntity(UserRequestModel userRequestModel) {
        return User.builder()
                .id(generateUUIDString()) // Generate a unique userId
                .fullName(userRequestModel.getFullName())
                .email(userRequestModel.getEmail())
                .company(userRequestModel.getCompany())
                .role(userRequestModel.getRole())
                .build();
    }

    // Utility method to generate a UUID string
    private static String generateUUIDString() {
        return java.util.UUID.randomUUID().toString();
    }
}
