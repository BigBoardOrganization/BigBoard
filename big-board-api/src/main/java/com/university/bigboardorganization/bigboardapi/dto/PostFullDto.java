package com.university.bigboardorganization.bigboardapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostFullDto {

    private Long id;

    @NotBlank
    private String title;

    private String description;

    private String imageUrl;

    @NotNull
    private CategoryDto category;

    @NotNull
    private UserMiniDto user;

    private String createdDate;

}
