package com.university.bigboardorganization.bigboardapi.service;

import com.university.bigboardorganization.bigboardapi.domain.User;
import com.university.bigboardorganization.bigboardapi.dto.UserCreateRequestDto;
import com.university.bigboardorganization.bigboardapi.dto.UserDto;
import com.university.bigboardorganization.bigboardapi.dto.UserMiniDto;
import com.university.bigboardorganization.bigboardapi.dto.UserUpdateRequestDto;

import javax.security.auth.login.LoginException;
import java.util.List;

public interface UserService {

    List<UserDto> findAll();

    UserMiniDto findById(Long id);

    UserDto login(String email, String password) throws LoginException;

    UserDto register(UserCreateRequestDto userRequestDto);

    UserDto update(Long id, UserUpdateRequestDto userRequestDto);

    void disable(Long id);

    void enable(Long id);

    void changePassword(Long id, String password);

    User findByIdOrThrow(Long id);
}
