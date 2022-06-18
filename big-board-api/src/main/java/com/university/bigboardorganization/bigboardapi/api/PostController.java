package com.university.bigboardorganization.bigboardapi.api;

import com.university.bigboardorganization.bigboardapi.dto.PostFilter;
import com.university.bigboardorganization.bigboardapi.dto.PostFullDto;
import com.university.bigboardorganization.bigboardapi.dto.PostMiniDto;
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
    public Page<PostMiniDto> findAll(Pageable pageable) {
        return postService.findAll(pageable);
    }

    @PostMapping("filter")
    public Page<PostMiniDto> filter(
            Pageable pageable,
            @RequestBody PostFilter postFilter) {
        System.out.println(postFilter);
        return postService.findByFilter(postFilter, pageable);
    }

    @GetMapping("{id}")
    public PostFullDto findById(@PathVariable Long id) {
        return postService.findById(id);
    }

    @PostMapping
    public PostMiniDto create(@RequestBody @Validated PostRequestDto postRequestDto) {
        return postService.create(postRequestDto);
    }

    @PutMapping("{id}")
    public PostMiniDto update(@PathVariable Long id,
                              @RequestBody @Validated PostRequestDto postRequestDto) {
        return postService.update(id, postRequestDto);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        postService.delete(id);
    }

}
