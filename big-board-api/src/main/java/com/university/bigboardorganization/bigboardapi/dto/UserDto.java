package com.university.bigboardorganization.bigboardapi.dto;

import com.university.bigboardorganization.bigboardapi.constant.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    @NotBlank
    private Long id;

    @NotBlank
    private String email;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private UserRole userRole;

    private boolean enabled;
}
