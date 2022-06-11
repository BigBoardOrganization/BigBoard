package com.university.bigboardorganization.bigboardapi.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue
    private Long id;

    private String icon;

    private String name;

    private String description;

    private String color;

    @OneToMany(mappedBy = "category")
    private List<Post> posts;

}
