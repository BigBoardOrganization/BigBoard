package com.university.bigboardorganization.bigboardapi.mapper;

import com.university.bigboardorganization.bigboardapi.config.MapStructConfig;
import com.university.bigboardorganization.bigboardapi.domain.Post;
import com.university.bigboardorganization.bigboardapi.dto.PostFullDto;
import com.university.bigboardorganization.bigboardapi.dto.PostMiniDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Objects;

@Mapper(config = MapStructConfig.class)
public interface PostMapper {

    @Mapping(target = "description", source = "description", qualifiedByName = "cropDescription")
    @Mapping(target = "createdDate", source = "createdDate", dateFormat = "dd-MM-yyyy HH:mm:ss")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "author", source = "user.username")
    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "color", source = "category.color")
    PostMiniDto postToPostMiniDto(Post post);

    @Named("cropDescription")
    static String cropDescription(final String value) {
        if (Objects.isNull(value)) {
            return "";
        }
        return value.substring(0, Math.min(value.length(), 75)) + "...";
    }

    @Mapping(target = "createdDate", source = "createdDate", dateFormat = "dd-MM-yyyy HH:mm:ss")
    @BeanMapping(ignoreUnmappedSourceProperties = {"user", "category"})
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "category", ignore = true)
    PostFullDto postToPostFullDto(Post post);
}
