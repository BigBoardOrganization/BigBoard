package com.university.bigboardorganization.bigboardapi.mapper;

import com.university.bigboardorganization.bigboardapi.config.MapStructConfig;
import com.university.bigboardorganization.bigboardapi.domain.Category;
import com.university.bigboardorganization.bigboardapi.dto.CategoryDto;
import org.mapstruct.Mapper;

@Mapper(config = MapStructConfig.class)
public interface CategoryMapper {

    Category categoryDtoToCategory(CategoryDto categoryDto);

    CategoryDto categoryToCategoryDto(Category category);

}
