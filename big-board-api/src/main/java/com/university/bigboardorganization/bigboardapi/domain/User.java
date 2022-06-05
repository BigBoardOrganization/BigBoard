package com.university.bigboardorganization.bigboardapi.domain;

import com.university.bigboardorganization.bigboardapi.constant.UserRole;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole userRole = UserRole.CUSTOMER;

    private boolean enabled;

    @OneToMany(mappedBy = "user")
    private List<Post> posts;

}
