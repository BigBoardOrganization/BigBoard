package com.university.bigboardorganization.bigboardapi.service;

import com.university.bigboardorganization.bigboardapi.dto.PostFullDto;
import com.university.bigboardorganization.bigboardapi.dto.PostMiniDto;
import com.university.bigboardorganization.bigboardapi.dto.PostRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {

    Page<PostMiniDto> findAll(Pageable pageable);

    Page<PostMiniDto> findAllByUserId(Long userId, Pageable pageable);

    PostFullDto findById(Long id);

    PostMiniDto create(PostRequestDto categoryCreateRequest);

    PostMiniDto update(Long id, PostRequestDto categoryUpdateRequest);

    void delete(Long id);
}
