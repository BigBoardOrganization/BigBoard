package com.university.bigboardorganization.bigboardapi.api;

import com.university.bigboardorganization.bigboardapi.dto.PostDto;
import com.university.bigboardorganization.bigboardapi.dto.PostRequestDto;
import com.university.bigboardorganization.bigboardapi.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping
    public Page<PostDto> findAll(Pageable pageable) {
        return postService.findAll(pageable);
    }

    @GetMapping("byUser/{userId}")
    public Page<PostDto> findAllByUserId(Pageable pageable, @PathVariable Long userId) {
        return postService.findAllByUserId(userId, pageable);
    }

    @GetMapping("{id}")
    public PostDto findById(@PathVariable Long id) {
        return postService.findById(id);
    }

    @PostMapping
    public PostDto create(@RequestBody @Validated PostRequestDto postRequestDto) {
        return postService.create(postRequestDto);
    }

    @PutMapping("{id}")
    public PostDto update(@PathVariable Long id,
                          @RequestBody @Validated PostRequestDto postRequestDto) {
        return postService.update(id, postRequestDto);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        postService.delete(id);
    }

}
