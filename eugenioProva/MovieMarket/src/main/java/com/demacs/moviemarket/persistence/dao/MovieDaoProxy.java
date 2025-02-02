package com.demacs.moviemarket.persistence.dao;

import com.demacs.moviemarket.persistence.model.Movie;
import java.util.List;

public class MovieDaoProxy implements MovieDao {
    private final MovieDao movieDao;

    public MovieDaoProxy(MovieDao movieDao) {
        this.movieDao = movieDao;
    }

    @Override
    public Movie findById(int id) {
        return movieDao.findById(id);
    }

    @Override
    public List<Movie> findAll() {
        return movieDao.findAll();
    }

    @Override
    public List<Movie> findByRating(int rating) {
        return movieDao.findByRating(rating);
    }

    @Override
    public List<Movie> findByCategory(int categoryId) {
        return movieDao.findByCategory(categoryId);
    }

    @Override
    public List<Movie> findMostRecent(int limit) {
        return movieDao.findMostRecent(limit);
    }

    @Override
    public void save(Movie movie) {
        movieDao.save(movie);
    }

    @Override
    public void update(Movie movie) {
        movieDao.update(movie);
    }

    @Override
    public void delete(Movie movie) {
        movieDao.delete(movie);
    }
}

