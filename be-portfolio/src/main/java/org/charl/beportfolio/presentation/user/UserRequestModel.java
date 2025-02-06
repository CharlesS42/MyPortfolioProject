package org.charl.beportfolio.presentation.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestModel {
    private String fullName;
    private String email;
    private String company;
    private String role;
}
