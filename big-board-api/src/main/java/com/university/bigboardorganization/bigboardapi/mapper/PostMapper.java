package com.university.bigboardorganization.bigboardapi.mapper;

import com.university.bigboardorganization.bigboardapi.config.MapStructConfig;
import com.university.bigboardorganization.bigboardapi.domain.Post;
import com.university.bigboardorganization.bigboardapi.dto.PostDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface PostMapper {

    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "createdDate", source = "createdDate", dateFormat = "dd-MM-yyyy HH:mm:ss")
    PostDto postToPostDto(Post post);

}
