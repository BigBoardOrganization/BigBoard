package com.university.bigboardorganization.bigboardapi.service;

import com.university.bigboardorganization.bigboardapi.domain.Category;
import com.university.bigboardorganization.bigboardapi.dto.CategoryCreateRequest;
import com.university.bigboardorganization.bigboardapi.dto.CategoryDto;
import com.university.bigboardorganization.bigboardapi.dto.CategoryUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {

    Page<CategoryDto> findAll(Pageable pageable);

    CategoryDto findById(Long id);

    CategoryDto create(CategoryCreateRequest categoryCreateRequest);

    CategoryDto update(Long id, CategoryUpdateRequest categoryUpdateRequest);

    void delete(Long id);

    Category findByIdOrThrow(Long id);

    List<Long> allCategoryIds();
}
