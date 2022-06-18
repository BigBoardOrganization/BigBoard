package com.university.bigboardorganization.bigboardapi.service.impl;

import com.university.bigboardorganization.bigboardapi.domain.User;
import com.university.bigboardorganization.bigboardapi.dto.UserCreateRequestDto;
import com.university.bigboardorganization.bigboardapi.dto.UserDto;
import com.university.bigboardorganization.bigboardapi.dto.UserMiniDto;
import com.university.bigboardorganization.bigboardapi.dto.UserUpdateRequestDto;
import com.university.bigboardorganization.bigboardapi.exception.EntityDuplicatesException;
import com.university.bigboardorganization.bigboardapi.exception.EntityNotFoundException;
import com.university.bigboardorganization.bigboardapi.mapper.UserMapper;
import com.university.bigboardorganization.bigboardapi.repository.UserRepository;
import com.university.bigboardorganization.bigboardapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final String ENTITY_NAME = "User";

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserDto> findAll() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::userToUserDto)
                .toList();
    }

    @Override
    public UserMiniDto findById(Long id) {
        return userMapper.userToUserMiniDto(findByIdOrThrow(id));
    }

    @Override
    public UserDto login(String email, String password) throws LoginException {
        User user = findByEmailOrThrow(email);
        if (passwordEncoder.matches(password, user.getPassword())) {
            return userMapper.userToUserDto(user);
        }
        throw new LoginException("Invalid password");
    }

    @Override
    public UserDto register(UserCreateRequestDto userRequestDto) {
        validateForCreate(userRequestDto);
        User user = User.builder()
                .email(userRequestDto.getEmail())
                .phoneNumber(userRequestDto.getPhoneNumber())
                .username(userRequestDto.getUsername())
                .password(passwordEncoder.encode(userRequestDto.getPassword()))
                .build();
        return userMapper.userToUserDto(userRepository.save(user));
    }

    @Override
    public UserDto update(Long id, UserUpdateRequestDto userRequestDto) {
        validateForUpdate(id, userRequestDto);
        User user = findByIdOrThrow(id).toBuilder()
                .email(userRequestDto.getEmail())
                .phoneNumber(userRequestDto.getPhoneNumber())
                .build();
        return userMapper.userToUserDto(userRepository.save(user));
    }

    @Override
    public void disable(Long id) {
        User user = findByIdOrThrow(id);
        user.setEnabled(false);
        user.setId(id);
        userRepository.save(user);
    }

    @Override
    public void enable(Long id) {
        User user = findByIdOrThrow(id);
        user.setEnabled(true);
        user.setId(id);
        userRepository.save(user);
    }

    @Override
    public void changePassword(Long id, String password) {
        User user = findByIdOrThrow(id);
        user.setPassword(passwordEncoder.encode(password));
        userMapper.userToUserDto(userRepository.save(user));
    }

    public User findByIdOrThrow(Long id) {
        return userRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(ENTITY_NAME, id));
    }

    @Override
    public List<Long> allUserIds() {
        return userRepository.findAll().stream()
                .map(User::getId)
                .toList();
    }

    private User findByEmailOrThrow(String email) {
        return userRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException(ENTITY_NAME, "email", email));
    }

    private void validateForCreate(UserCreateRequestDto user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EntityDuplicatesException(ENTITY_NAME, "email", user.getEmail());
        }
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new EntityDuplicatesException(ENTITY_NAME, "username", user.getUsername());
        }
    }

    private void validateForUpdate(Long id, UserUpdateRequestDto user) {
        userRepository.findAllByEmail(user.getEmail()).forEach((User u) -> {
            if (!Objects.equals(u.getId(), id)) {
                throw new EntityDuplicatesException(ENTITY_NAME, "email", user.getEmail());
            }
        });
        userRepository.findAllByUsername(user.getUsername()).forEach((User u) -> {
            if (!Objects.equals(u.getId(), id)) {
                throw new EntityDuplicatesException(ENTITY_NAME, "username", user.getUsername());
            }
        });
    }
}
