package com.university.bigboardorganization.bigboardapi.mapper;

import com.university.bigboardorganization.bigboardapi.config.MapStructConfig;
import com.university.bigboardorganization.bigboardapi.domain.Category;
import com.university.bigboardorganization.bigboardapi.dto.CategoryDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface CategoryMapper {

    @Mapping(target = "posts", ignore = true)
    Category categoryDtoToCategory(CategoryDto categoryDto);

    @BeanMapping(ignoreUnmappedSourceProperties = {"posts"})
    CategoryDto categoryToCategoryDto(Category category);

}
