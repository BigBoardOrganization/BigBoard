package com.university.bigboardorganization.bigboardapi.service;

import com.university.bigboardorganization.bigboardapi.dto.PostDto;
import com.university.bigboardorganization.bigboardapi.dto.PostRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {

    Page<PostDto> findAll(Pageable pageable);

    PostDto findById(Long id);

    PostDto create(PostRequestDto categoryCreateRequest);

    PostDto update(Long id, PostRequestDto categoryUpdateRequest);

    void delete(Long id);
}
