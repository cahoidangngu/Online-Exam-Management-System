package com.quanchun.backendexamsystem.mappers;

import com.quanchun.backendexamsystem.dtos.UserDTO;
import com.quanchun.backendexamsystem.models.User;
import org.mapstruct.Mapper;


@Mapper(componentModel = "Spring")
public interface UserMapper extends EntityMapper<UserDTO, User> {
}
