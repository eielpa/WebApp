package com.demacs.moviemarket.persistence.dao;

import com.demacs.moviemarket.persistence.model.Movie;

import java.util.List;

public interface MovieDao {
    Movie findById(int id);
    List<Movie> findAll();
    void save(Movie movie);
    void update(Movie movie);
    void delete(Movie movie);
}
