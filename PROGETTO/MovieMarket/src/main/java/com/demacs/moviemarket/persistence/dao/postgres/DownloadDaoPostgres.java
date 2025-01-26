package com.demacs.moviemarket.persistence.dao.postgres;

import com.demacs.moviemarket.persistence.dao.DownloadDao;
import com.demacs.moviemarket.persistence.model.Download;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DownloadDaoPostgres implements DownloadDao {

    private final Connection conn;

    public DownloadDaoPostgres(Connection conn) {
        this.conn = conn;
    }

    @Override
    public Download findById(int id) {
        Download download = null;
        String query = "SELECT * FROM downloads WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(query)) {
            st.setInt(1, id);
            ResultSet rs = st.executeQuery();

            if (rs.next()) {
                download = new Download();
                download.setId(rs.getInt("id"));
                download.setUserId(rs.getInt("user_id"));
                download.setMovieId(rs.getInt("movie_id"));
                download.setDownloadDate(rs.getString("download_date"));
                download.setDownloadStatus(rs.getString("download_status"));
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }

        return download;
    }

    @Override
    public List<Download> findAll() {
        List<Download> downloads = new ArrayList<>();
        String query = "SELECT * FROM downloads";
        try (Statement st = conn.createStatement()) {
            ResultSet rs = st.executeQuery(query);

            while (rs.next()) {
                Download download = new Download();
                download.setId(rs.getInt("id"));
                download.setUserId(rs.getInt("user_id"));
                download.setMovieId(rs.getInt("movie_id"));
                download.setDownloadDate(rs.getString("download_date"));
                download.setDownloadStatus(rs.getString("download_status"));
                downloads.add(download);
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }

        return downloads;
    }

    @Override
    public void save(Download download) {
        String insertStr = "INSERT INTO downloads (user_id, movie_id, download_date, download_status) VALUES (?, ?, ?, ?)";
        try (PreparedStatement st = conn.prepareStatement(insertStr)) {
            st.setInt(1, download.getUserId());
            st.setInt(2, download.getMovieId());
            st.setString(3, download.getDownloadDate());
            st.setString(4, download.getDownloadStatus());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void update(Download download) {
        String updateStr = "UPDATE downloads SET user_id = ?, movie_id = ?, download_date = ?, download_status = ? WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(updateStr)) {
            st.setInt(1, download.getUserId());
            st.setInt(2, download.getMovieId());
            st.setString(3, download.getDownloadDate());
            st.setString(4, download.getDownloadStatus());
            st.setInt(5, download.getId());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void delete(Download download) {
        String deleteStr = "DELETE FROM downloads WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(deleteStr)) {
            st.setInt(1, download.getId());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }
}
