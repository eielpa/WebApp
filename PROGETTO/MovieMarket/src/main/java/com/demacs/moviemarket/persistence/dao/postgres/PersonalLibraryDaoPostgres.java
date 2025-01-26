package com.demacs.moviemarket.persistence.dao.postgres;

import com.demacs.moviemarket.persistence.dao.PersonalLibraryDao;
import com.demacs.moviemarket.persistence.model.PersonalLibrary;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PersonalLibraryDaoPostgres implements PersonalLibraryDao {

    private final Connection conn;

    public PersonalLibraryDaoPostgres(Connection conn) {
        this.conn = conn;
    }

    @Override
    public PersonalLibrary findById(int id) {
        PersonalLibrary personalLibrary = null;
        String query = "SELECT * FROM personal_library WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(query)) {
            st.setInt(1, id);
            ResultSet rs = st.executeQuery();

            if (rs.next()) {
                personalLibrary = new PersonalLibrary();
                personalLibrary.setId(rs.getInt("id"));
                personalLibrary.setUserId(rs.getInt("user_id"));
                personalLibrary.setMovieId(rs.getInt("movie_id"));
                personalLibrary.setDownloadDate(rs.getString("download_date"));
                personalLibrary.setDownloadStatus(rs.getString("download_status"));
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }

        return personalLibrary;
    }

    @Override
    public List<PersonalLibrary> findAll() {
        List<PersonalLibrary> personalLibraries = new ArrayList<>();
        String query = "SELECT * FROM personal_library";
        try (Statement st = conn.createStatement()) {
            ResultSet rs = st.executeQuery(query);

            while (rs.next()) {
                PersonalLibrary personalLibrary = new PersonalLibrary();
                personalLibrary.setId(rs.getInt("id"));
                personalLibrary.setUserId(rs.getInt("user_id"));
                personalLibrary.setMovieId(rs.getInt("movie_id"));
                personalLibrary.setDownloadDate(rs.getString("download_date"));
                personalLibrary.setDownloadStatus(rs.getString("download_status"));
                personalLibraries.add(personalLibrary);
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }

        return personalLibraries;
    }

    @Override
    public void save(PersonalLibrary personalLibrary) {
        String insertStr = "INSERT INTO personal_library (user_id, movie_id, download_date, download_status) VALUES (?, ?, ?, ?)";
        try (PreparedStatement st = conn.prepareStatement(insertStr)) {
            st.setInt(1, personalLibrary.getUserId());
            st.setInt(2, personalLibrary.getMovieId());
            st.setString(3, personalLibrary.getDownloadDate());
            st.setString(4, personalLibrary.getDownloadStatus());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void update(PersonalLibrary personalLibrary) {
        String updateStr = "UPDATE personal_library SET user_id = ?, movie_id = ?, download_date = ?, download_status = ? WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(updateStr)) {
            st.setInt(1, personalLibrary.getUserId());
            st.setInt(2, personalLibrary.getMovieId());
            st.setString(3, personalLibrary.getDownloadDate());
            st.setString(4, personalLibrary.getDownloadStatus());
            st.setInt(5, personalLibrary.getId());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void delete(PersonalLibrary personalLibrary) {
        String deleteStr = "DELETE FROM personal_library WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(deleteStr)) {
            st.setInt(1, personalLibrary.getId());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }
}
