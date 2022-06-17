package com.university.bigboardorganization.bigboardapi.mapper;

import com.university.bigboardorganization.bigboardapi.config.MapStructConfig;
import com.university.bigboardorganization.bigboardapi.domain.User;
import com.university.bigboardorganization.bigboardapi.dto.UserDto;
import com.university.bigboardorganization.bigboardapi.dto.UserMiniDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface UserMapper {

    @Mapping(target = "posts", ignore = true)
    User userDtoToUser(UserDto userDto);

    @BeanMapping(ignoreUnmappedSourceProperties = {"posts"})
    UserDto userToUserDto(User user);

    @BeanMapping(ignoreUnmappedSourceProperties = {"posts", "password", "enabled", "userRole"})
    UserMiniDto userToUserMiniDto(User user);
}
