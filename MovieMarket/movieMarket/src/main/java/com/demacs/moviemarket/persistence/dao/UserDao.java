package com.demacs.moviemarket.persistence.dao;

import com.demacs.moviemarket.persistence.model.User;

import java.util.List;

public interface UserDao {
    User findById(int id);
    List<User> findAll();
    void save(User user);
    void update(User user);
    void delete(User user);
}