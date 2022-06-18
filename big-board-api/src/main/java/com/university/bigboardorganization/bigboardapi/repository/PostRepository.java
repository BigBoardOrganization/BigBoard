package com.university.bigboardorganization.bigboardapi.repository;

import com.university.bigboardorganization.bigboardapi.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findByOrderByCreatedDateDesc(Pageable pageable);

    Page<Post> findAllByTitleContainsAndCategoryIdInAndUserIdInOrderByCreatedDateDesc(
            String title, List<Long> categories, List<Long> userId, Pageable pageable);

    Page<Post> findAllByCategoryIdInAndUserIdInOrderByCreatedDateDesc(
            List<Long> categories, List<Long> userId, Pageable pageable);
}
