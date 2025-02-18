package org.charl.beportfolio.utils.entitymodelutils;

import org.charl.beportfolio.dataaccess.user.User;
import org.charl.beportfolio.presentation.user.UserRequestModel;
import org.charl.beportfolio.presentation.user.UserResponseModel;
import org.springframework.beans.BeanUtils;

public class UserEntityModelUtil {

    public static UserResponseModel toUserResponseModel(User user) {
        UserResponseModel model = new UserResponseModel();
        model.setUserId(user.getUserId());
        model.setEmail(user.getEmail());
        model.setFirstName(user.getFirstName());
        model.setLastName(user.getLastName());
        model.setRoles(user.getRoles());
        model.setPermissions(user.getPermissions());
        return model;
    }
    // Utility method to generate a UUID string
    private static String generateUUIDString() {
        return java.util.UUID.randomUUID().toString();
    }
}
