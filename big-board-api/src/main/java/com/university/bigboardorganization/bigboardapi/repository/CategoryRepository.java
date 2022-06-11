package com.university.bigboardorganization.bigboardapi.repository;

import com.university.bigboardorganization.bigboardapi.domain.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
