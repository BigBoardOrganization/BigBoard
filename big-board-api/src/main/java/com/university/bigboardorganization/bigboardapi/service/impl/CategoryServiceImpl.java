package com.university.bigboardorganization.bigboardapi.service.impl;

import com.university.bigboardorganization.bigboardapi.domain.Category;
import com.university.bigboardorganization.bigboardapi.dto.CategoryCreateRequest;
import com.university.bigboardorganization.bigboardapi.dto.CategoryDto;
import com.university.bigboardorganization.bigboardapi.dto.CategoryUpdateRequest;
import com.university.bigboardorganization.bigboardapi.mapper.CategoryMapper;
import com.university.bigboardorganization.bigboardapi.repository.CategoryRepository;
import com.university.bigboardorganization.bigboardapi.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    private final CategoryMapper categoryMapper;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public Page<CategoryDto> findAll(Pageable pageable) {
        return categoryRepository.findAll(pageable).map((categoryMapper::categoryToCategoryDto));
    }

    @Override
    public CategoryDto findById(Long id) {
        return categoryMapper.categoryToCategoryDto(findByIdOrThrow(id));
    }

    @Override
    public CategoryDto create(CategoryCreateRequest categoryCreateRequest) {
        Category category = Category.builder()
                .name(categoryCreateRequest.getName())
                .description(categoryCreateRequest.getDescription())
                .color(categoryCreateRequest.getColor())
                .build();

        return categoryMapper.categoryToCategoryDto(categoryRepository.save(category));
    }

    @Override
    public CategoryDto update(Long id, CategoryUpdateRequest categoryUpdateRequest) {
        Category categoryFromDB = findByIdOrThrow(id);

        Category category = categoryFromDB.toBuilder()
                .name(categoryUpdateRequest.getName())
                .description(categoryUpdateRequest.getDescription())
                .color(categoryUpdateRequest.getColor())
                .build();

        return categoryMapper.categoryToCategoryDto(categoryRepository.save(category));
    }


    @Override
    public void delete(Long id) {
        categoryRepository.delete(findByIdOrThrow(id));
    }

    private Category findByIdOrThrow(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found!"));
    }

}
