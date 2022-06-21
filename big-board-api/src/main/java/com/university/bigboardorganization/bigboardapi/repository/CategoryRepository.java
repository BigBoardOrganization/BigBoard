package com.university.bigboardorganization.bigboardapi.repository;

import com.university.bigboardorganization.bigboardapi.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findAllByName(String name);
}
