package com.university.bigboardorganization.bigboardapi.mapper;

import com.university.bigboardorganization.bigboardapi.api.dto.CategoryCreateRequest;
import com.university.bigboardorganization.bigboardapi.api.dto.CategoryDto;
import com.university.bigboardorganization.bigboardapi.api.dto.CategoryUpdateRequest;
import com.university.bigboardorganization.bigboardapi.config.MapStructConfig;
import com.university.bigboardorganization.bigboardapi.domain.Category;
import org.mapstruct.*;

import java.util.List;

@Mapper(config = MapStructConfig.class)
public interface CategoryMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", ignore = true)
    @Mapping(target = "posts", ignore = true)
    Category categoryDtoToCategory(CategoryDto categoryDto);

    @BeanMapping(ignoreUnmappedSourceProperties = {"id", "name", "posts"})
    CategoryDto categoryToCategoryDto(Category category);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", ignore = true)
    @Mapping(target = "posts", ignore = true)
    Category categoryCreateRequestToCategory(CategoryCreateRequest categoryCreateRequest);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", ignore = true)
    @Mapping(target = "posts", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCategoryFromCategoryDto(CategoryUpdateRequest categoryUpdateRequest, @MappingTarget Category category);

}
