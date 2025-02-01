package com.demacs.moviemarket.controller;

import com.demacs.moviemarket.persistence.model.Movie;
import com.demacs.moviemarket.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    // Endpoint per ottenere tutti i film
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieService.findAll();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    // Endpoint per ottenere un film specifico per ID
    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable int id) {
        Movie movie = movieService.findById(id);
        if (movie != null) {
            return new ResponseEntity<>(movie, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint per creare un nuovo film
    @PostMapping
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        movieService.save(movie);
        return new ResponseEntity<>(movie, HttpStatus.CREATED);
    }

    // Endpoint per aggiornare un film
    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable int id, @RequestBody Movie movie) {
        Movie existingMovie = movieService.findById(id);
        if (existingMovie != null) {
            movie.setId(id);  // Assicurati che l'ID rimanga invariato durante l'aggiornamento
            movieService.update(movie);
            return new ResponseEntity<>(movie, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint per eliminare un film
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable int id) {
        Movie movie = movieService.findById(id);
        if (movie != null) {
            movieService.delete(movie);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint per ottenere film con un determinato rating
    @GetMapping("/rating/{rating}")
    public ResponseEntity<List<Movie>> getMoviesByRating(@PathVariable int rating) {
        List<Movie> movies = movieService.findByRating(rating);
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    // Endpoint per ottenere film di una categoria
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Movie>> getMoviesByCategory(@PathVariable int categoryId) {
        List<Movie> movies = movieService.findByCategory(categoryId);
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    // Endpoint per ottenere i film più recenti
    @GetMapping("/recent/{limit}")
    public ResponseEntity<List<Movie>> getMostRecentMovies(@PathVariable int limit) {
        List<Movie> movies = movieService.findMostRecent(limit);
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }
}
