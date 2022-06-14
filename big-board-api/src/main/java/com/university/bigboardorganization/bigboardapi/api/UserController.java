package com.university.bigboardorganization.bigboardapi.api;

import com.university.bigboardorganization.bigboardapi.dto.UserCreateRequestDto;
import com.university.bigboardorganization.bigboardapi.dto.UserDto;
import com.university.bigboardorganization.bigboardapi.dto.UserLoginDto;
import com.university.bigboardorganization.bigboardapi.dto.UserUpdateRequestDto;
import com.university.bigboardorganization.bigboardapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.LoginException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserDto> findAll() {
        return userService.findAll();
    }

    @GetMapping("login")
    public UserDto login(@RequestBody UserLoginDto loginDto) throws LoginException {
        return userService.login(loginDto.getEmail(), loginDto.getPassword());
    }

    @PostMapping
    public UserDto register(@RequestBody @Validated UserCreateRequestDto userCreateRequestDto) {
        return userService.register(userCreateRequestDto);
    }

    @PutMapping("{id}")
    public UserDto update(@PathVariable("id") Long id,
                          @RequestBody @Validated UserUpdateRequestDto userUpdateRequestDto) {
        return userService.update(id, userUpdateRequestDto);
    }

    @PatchMapping("{id}/enable")
    public void enable(@PathVariable("id") Long id) {
        userService.enable(id);
    }

    @PatchMapping("{id}/disable")
    public void disable(@PathVariable("id") Long id) {
        userService.disable(id);
    }

    @PatchMapping("{id}/changePassword")
    public void changePassword(@PathVariable("id") Long id,
                               @RequestBody String password) {
        userService.changePassword(id, password);
    }

}
