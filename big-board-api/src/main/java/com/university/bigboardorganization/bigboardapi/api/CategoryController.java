package com.university.bigboardorganization.bigboardapi.api;

import com.university.bigboardorganization.bigboardapi.dto.CategoryCreateRequest;
import com.university.bigboardorganization.bigboardapi.dto.CategoryDto;
import com.university.bigboardorganization.bigboardapi.dto.CategoryUpdateRequest;
import com.university.bigboardorganization.bigboardapi.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/category", produces = MediaType.APPLICATION_JSON_VALUE)
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public Page<CategoryDto> findAll(@RequestParam(required = false) String name, Pageable pageable) {
        return categoryService.findAll(name, pageable);
    }

    @GetMapping("/{id}")
    public CategoryDto findById(@PathVariable Long id) {
        return categoryService.findById(id);
    }

    @PostMapping
    public CategoryDto create(@RequestBody @Validated CategoryCreateRequest categoryCreateRequest) {
        return categoryService.create(categoryCreateRequest);
    }

    @PutMapping("/{id}")
    public CategoryDto update(@PathVariable("id") Long id, @RequestBody @Validated CategoryUpdateRequest categoryUpdateRequest) {
        return categoryService.update(id, categoryUpdateRequest);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        categoryService.delete(id);
    }

}
