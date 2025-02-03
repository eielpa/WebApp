package com.demacs.moviemarket.persistence.dao.postgres;

import com.demacs.moviemarket.persistence.DBManager;
import com.demacs.moviemarket.persistence.dao.MovieDao;
import com.demacs.moviemarket.persistence.model.Movie;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MovieDaoPostgres implements MovieDao {

    private final Connection conn;

    public MovieDaoPostgres(DBManager dbManager) {
        this.conn = dbManager.getConnection();
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
                movie.setRating((Integer) rs.getObject("rating")); // Usa getObject per gestire i null
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
                movie.setRating((Integer) rs.getObject("rating")); // Gestisce i null
                movies.add(movie);
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }

        return movies;
    }


    @Override
    public void save(Movie movie) {
        String insertStr = "INSERT INTO movies (title, description, release_year, category_id, rating) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement st = conn.prepareStatement(insertStr)) {
            st.setString(1, movie.getTitle());
            st.setString(2, movie.getDescription());
            st.setInt(3, movie.getReleaseYear());
            st.setInt(4, movie.getCategoryId());
            if (movie.getRating() != null) {
                st.setInt(5, movie.getRating());
            } else {
                st.setNull(5, Types.INTEGER);
            }
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }


    @Override
    public void update(Movie movie) {
        String updateStr = "UPDATE movies SET title = ?, description = ?, release_year = ?, category_id = ?, rating = ? WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(updateStr)) {
            st.setString(1, movie.getTitle());
            st.setString(2, movie.getDescription());
            st.setInt(3, movie.getReleaseYear());
            st.setInt(4, movie.getCategoryId());
            if (movie.getRating() != null) {
                st.setInt(5, movie.getRating());
            } else {
                st.setNull(5, Types.INTEGER);
            }
            st.setInt(6, movie.getId());
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

    @Override
    public List<Movie> findByRating(int rating) {
        List<Movie> movies = new ArrayList<>();
        String query = "SELECT * FROM movies WHERE rating >= ? ORDER BY rating DESC LIMIT 10";
        try (PreparedStatement st = conn.prepareStatement(query)) {
            st.setInt(1, rating);
            ResultSet rs = st.executeQuery();

            while (rs.next()) {
                Movie movie = new Movie();
                movie.setId(rs.getInt("id"));
                movie.setTitle(rs.getString("title"));
                movie.setDescription(rs.getString("description"));
                movie.setReleaseYear(rs.getInt("release_year"));
                movie.setCategoryId(rs.getInt("category_id"));
                movie.setRating(rs.getObject("rating") != null ? ((Number) rs.getObject("rating")).intValue() : null);
                movie.setAddedDate(rs.getTimestamp("added_date").toLocalDateTime());
                movies.add(movie);
            }
            System.out.println("suca sono il postgres");
        } catch (SQLException exception) {
            exception.printStackTrace();
        }

        return movies;
    }

    @Override
    public List<Movie> findByCategory(int categoryId) {
        List<Movie> movies = new ArrayList<>();
        String query = "SELECT * FROM movies WHERE category_id = ?";
        try (PreparedStatement st = conn.prepareStatement(query)) {
            st.setInt(1, categoryId);
            ResultSet rs = st.executeQuery();

            while (rs.next()) {
                Movie movie = new Movie();
                movie.setId(rs.getInt("id"));
                movie.setTitle(rs.getString("title"));
                movie.setDescription(rs.getString("description"));
                movie.setReleaseYear(rs.getInt("release_year"));
                movie.setCategoryId(rs.getInt("category_id"));
                movie.setRating(rs.getObject("rating") != null ? ((Number) rs.getObject("rating")).intValue() : null);
                Timestamp ts = rs.getTimestamp("added_date");
                if (ts != null) {
                    movie.setAddedDate(ts.toLocalDateTime());
                }

                movies.add(movie);
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }

        return movies;
    }

    @Override
    public List<Movie> findMostRecent(int limit) {
        List<Movie> movies = new ArrayList<>();
        String query = "SELECT * FROM movies ORDER BY added_date DESC LIMIT ?";
        System.out.println("Query most recent" + query);
        try (PreparedStatement st = conn.prepareStatement(query)) {
            st.setInt(1, limit);
            ResultSet rs = st.executeQuery();

            while (rs.next()) {
                Movie movie = new Movie();
                movie.setId(rs.getInt("id"));
                movie.setTitle(rs.getString("title"));
                movie.setDescription(rs.getString("description"));
                movie.setReleaseYear(rs.getInt("release_year"));
                movie.setCategoryId(rs.getInt("category_id"));
                movie.setRating(rs.getObject("rating") != null ? ((Number) rs.getObject("rating")).intValue() : null);
                movie.setAddedDate(rs.getTimestamp("added_date").toLocalDateTime());
                movies.add(movie);
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }

        return movies;
    }


}
