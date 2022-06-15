package com.university.bigboardorganization.bigboardapi.api;

import com.university.bigboardorganization.bigboardapi.constant.UserRole;
import com.university.bigboardorganization.bigboardapi.domain.User;
import com.university.bigboardorganization.bigboardapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommandLineAppStartupRunner implements CommandLineRunner {

    @Value("${admin-user.email}")
    private String ADMIN_EMAIL;

    @Value("${admin-user.username}")
    private String ADMIN_USERNAME;

    @Value("${admin-user.password}")
    private String ADMIN_PASSWORD;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.existsByEmail(ADMIN_EMAIL)) {
            return;
        }
        User user = User.builder()
                .username(ADMIN_USERNAME)
                .email(ADMIN_EMAIL)
                .password(passwordEncoder.encode(ADMIN_PASSWORD))
                .userRole(UserRole.ADMIN)
                .build();
        userRepository.save(user);
    }

}
