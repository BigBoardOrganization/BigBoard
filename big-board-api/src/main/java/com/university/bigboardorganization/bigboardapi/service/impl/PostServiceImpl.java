package com.university.bigboardorganization.bigboardapi.service.impl;

import com.university.bigboardorganization.bigboardapi.domain.Post;
import com.university.bigboardorganization.bigboardapi.dto.PostDto;
import com.university.bigboardorganization.bigboardapi.dto.PostRequestDto;
import com.university.bigboardorganization.bigboardapi.exception.EntityNotFoundException;
import com.university.bigboardorganization.bigboardapi.mapper.PostMapper;
import com.university.bigboardorganization.bigboardapi.repository.PostRepository;
import com.university.bigboardorganization.bigboardapi.service.CategoryService;
import com.university.bigboardorganization.bigboardapi.service.PostService;
import com.university.bigboardorganization.bigboardapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final CategoryService categoryService;
    private final UserService userService;

    @Override
    public Page<PostDto> findAll(Pageable pageable) {
        return postRepository.findAll(pageable).map(postMapper::postToPostDto);
    }

    @Override
    public PostDto findById(Long id) {
        return postMapper.postToPostDto(findByIdOrThrow(id));
    }

    @Override
    public PostDto create(PostRequestDto postDto) {
        Post post = Post.builder()
                .title(postDto.getTitle())
                .description(postDto.getTitle())
                .imageUrl(postDto.getImageUrl())
                .createdDate(LocalDateTime.now())
                .category(categoryService.findByIdOrThrow(postDto.getCategoryId()))
                .user(userService.findByIdOrThrow(postDto.getUserId()))
                .build();

        return postMapper.postToPostDto(postRepository.save(post));
    }

    @Override
    public PostDto update(Long id, PostRequestDto postDto) {
        Post postFromDb = findByIdOrThrow(id);

        Post post = postFromDb.toBuilder()
                .title(postDto.getTitle())
                .description(postDto.getDescription())
                .imageUrl(postDto.getImageUrl())
                .category(categoryService.findByIdOrThrow(postDto.getCategoryId()))
                .user(userService.findByIdOrThrow(postDto.getUserId()))
                .build();

        return postMapper.postToPostDto(postRepository.save(post));
    }

    @Override
    public void delete(Long id) {
        postRepository.deleteById(id);
    }

    private Post findByIdOrThrow(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Post", id));
    }
}
