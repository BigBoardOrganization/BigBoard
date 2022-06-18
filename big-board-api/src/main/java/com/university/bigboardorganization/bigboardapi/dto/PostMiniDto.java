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
public class PostMiniDto {

    private Long id;

    @NotBlank
    private String title;

    private String description;

    private String imageUrl;

    private String color;

    @NotNull
    private Long categoryId;

    @NotNull
    private Long userId;

    @NotNull
    private String author;

    private String createdDate;

}
