package com.demacs.moviemarket.persistence.dao.postgres;

import com.demacs.moviemarket.persistence.dao.MovieDao;
import com.demacs.moviemarket.persistence.model.Movie;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MovieDaoPostgres implements MovieDao {

    private final Connection conn;

    public MovieDaoPostgres(Connection conn) {
        this.conn = conn;
    }

    @Override
    public Movie findById(int id) {
        Movie movie = null;
        String query = "SELECT * FROM movies WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(query)) {
            st.setInt(1, id);
            ResultSet rs = st.executeQuery();

            if (rs.next()) {
                movie = new Movie();
                movie.setId(rs.getInt("id"));
                movie.setTitle(rs.getString("title"));
                movie.setDescription(rs.getString("description"));
                movie.setReleaseYear(rs.getInt("release_year"));
                movie.setCategoryId(rs.getInt("category_id"));
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }

        return movie;
    }

    @Override
    public List<Movie> findAll() {
        List<Movie> movies = new ArrayList<>();
        String query = "SELECT * FROM movies";
        try (Statement st = conn.createStatement()) {
            ResultSet rs = st.executeQuery(query);

            while (rs.next()) {
                Movie movie = new Movie();
                movie.setId(rs.getInt("id"));
                movie.setTitle(rs.getString("title"));
                movie.setDescription(rs.getString("description"));
                movie.setReleaseYear(rs.getInt("release_year"));
                movie.setCategoryId(rs.getInt("category_id"));
                movies.add(movie);
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }

        return movies;
    }

    @Override
    public void save(Movie movie) {
        String insertStr = "INSERT INTO movies (title, description, release_year, category_id) VALUES (?, ?, ?, ?)";
        try (PreparedStatement st = conn.prepareStatement(insertStr)) {
            st.setString(1, movie.getTitle());
            st.setString(2, movie.getDescription());
            st.setInt(3, movie.getReleaseYear());
            st.setInt(4, movie.getCategoryId());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void update(Movie movie) {
        String updateStr = "UPDATE movies SET title = ?, description = ?, release_year = ?, category_id = ? WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(updateStr)) {
            st.setString(1, movie.getTitle());
            st.setString(2, movie.getDescription());
            st.setInt(3, movie.getReleaseYear());
            st.setInt(4, movie.getCategoryId());
            st.setInt(5, movie.getId());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void delete(Movie movie) {
        String deleteStr = "DELETE FROM movies WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(deleteStr)) {
            st.setInt(1, movie.getId());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }
}
