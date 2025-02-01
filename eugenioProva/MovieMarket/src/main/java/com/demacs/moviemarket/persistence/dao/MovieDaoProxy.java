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
        System.out.println("Fetching movie with ID: " + id);
        return movieDao.findById(id);
    }

    @Override
    public List<Movie> findAll() {
        System.out.println("Fetching all movies...");
        return movieDao.findAll();
    }

    @Override
    public List<Movie> findByRating(int rating) {
        return movieDao.findByRating(rating);
    }

    @Override
    public List<Movie> findByCategory(int categoryId) {
        return List.of();
    }

    @Override
    public List<Movie> findMostRecent(int limit) {
        return movieDao.findMostRecent(limit);
    }

    @Override
    public void save(Movie movie) {
        System.out.println("Saving movie: " + movie.getTitle());
        movieDao.save(movie);
    }

    @Override
    public void update(Movie movie) {
        System.out.println("Updating movie: " + movie.getTitle());
        movieDao.update(movie);
    }

    @Override
    public void delete(Movie movie) {
        System.out.println("Deleting movie: " + movie.getTitle());
        movieDao.delete(movie);
    }
}

