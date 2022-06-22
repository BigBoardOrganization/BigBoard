package com.university.bigboardorganization.bigboardapi.repository;

import com.university.bigboardorganization.bigboardapi.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long>, QuerydslPredicateExecutor<Category> {

    List<Category> findAllByName(String name);
}
