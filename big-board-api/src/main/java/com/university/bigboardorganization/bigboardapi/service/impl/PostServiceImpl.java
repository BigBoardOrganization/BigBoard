package com.university.bigboardorganization.bigboardapi.service.impl;

import com.university.bigboardorganization.bigboardapi.domain.Post;
import com.university.bigboardorganization.bigboardapi.dto.PostFilter;
import com.university.bigboardorganization.bigboardapi.dto.PostFullDto;
import com.university.bigboardorganization.bigboardapi.dto.PostMiniDto;
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
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final CategoryService categoryService;
    private final UserService userService;

    @Override
    public Page<PostMiniDto> findAll(Pageable pageable) {
        return postRepository.findByOrderByCreatedDateDesc(pageable).map(postMapper::postToPostMiniDto);
    }

    private boolean setDefaultIfNullAndReturnHasTitle(PostFilter postFilter) {
        boolean hasTitle = !Objects.isNull(postFilter.getTitle()) || postFilter.getTitle().isEmpty();

        if (Objects.isNull(postFilter.getCategories()) || postFilter.getCategories().isEmpty()) {
            postFilter.setCategories(categoryService.allCategoryIds());
        }

        if (Objects.isNull(postFilter.getUsers()) || postFilter.getUsers().isEmpty()) {
            postFilter.setUsers(userService.allUserIds());
        }

        return hasTitle;
    }

    @Override
    public Page<PostMiniDto> findByFilter(PostFilter filter, Pageable pageable) {
        Page<Post> page;

        // if filter has title
        if (setDefaultIfNullAndReturnHasTitle(filter)) {
            page = postRepository.findAllByTitleContainsAndCategoryIdInAndUserIdInOrderByCreatedDateDesc(
                    filter.getTitle(),
                    filter.getCategories(),
                    filter.getUsers(),
                    pageable
            );
        } else {
            page = postRepository.findAllByCategoryIdInAndUserIdInOrderByCreatedDateDesc(
                    filter.getCategories(),
                    filter.getUsers(),
                    pageable
            );
        }
        return page.map(postMapper::postToPostMiniDto);
    }

    @Override
    public PostFullDto findById(Long id) {
        Post post = findByIdOrThrow(id);
        PostFullDto postFullDto = postMapper.postToPostFullDto(post);
        postFullDto.setCategory(categoryService.findById(post.getCategory().getId()));
        postFullDto.setUser(userService.findById(post.getUser().getId()));
        return postFullDto;
    }

    @Override
    public PostMiniDto create(PostRequestDto postDto) {
        Post post = Post.builder()
                .title(postDto.getTitle())
                .description(postDto.getDescription())
                .imageUrl(postDto.getImageUrl())
                .createdDate(LocalDateTime.now())
                .category(categoryService.findByIdOrThrow(postDto.getCategoryId()))
                .user(userService.findByIdOrThrow(postDto.getUserId()))
                .build();

        return postMapper.postToPostMiniDto(postRepository.save(post));
    }

    @Override
    public PostMiniDto update(Long id, PostRequestDto postDto) {
        Post postFromDb = findByIdOrThrow(id);

        Post post = postFromDb.toBuilder()
                .title(postDto.getTitle())
                .description(postDto.getDescription())
                .imageUrl(postDto.getImageUrl())
                .category(categoryService.findByIdOrThrow(postDto.getCategoryId()))
                .user(userService.findByIdOrThrow(postDto.getUserId()))
                .build();

        return postMapper.postToPostMiniDto(postRepository.save(post));
    }

    @Override
    public void delete(Long id) {
        postRepository.deleteById(id);
    }

    private Post findByIdOrThrow(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Post", id));
    }
}
