package com.demacs.moviemarket.persistence.dao.postgres;

import com.demacs.moviemarket.persistence.dao.UserDao;
import com.demacs.moviemarket.persistence.model.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDaoPostgres implements UserDao {

    private final Connection conn;

    public UserDaoPostgres(Connection conn) {
        this.conn = conn;
    }

    @Override
    public User findById(int id) {
        User user = null;
        String query = "SELECT * FROM users WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(query)) {
            st.setInt(1, id);
            ResultSet rs = st.executeQuery();

            if (rs.next()) {
                user = new User();
                user.setId(rs.getString("id"));
                user.setName(rs.getString("name"));
                user.setEmail(rs.getString("email"));
                user.setPassword(rs.getString("password"));
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }

        return user;
    }

    @Override
    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        String query = "SELECT * FROM users";
        try (Statement st = conn.createStatement()) {
            ResultSet rs = st.executeQuery(query);

            while (rs.next()) {
                User user = new User();
                user.setId(rs.getString("id"));
                user.setName(rs.getString("name"));
                user.setEmail(rs.getString("email"));
                user.setPassword(rs.getString("password"));
                users.add(user);
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }

        return users;
    }

    @Override
    public void save(User user) {
        String insertStr = "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)";
        try (PreparedStatement st = conn.prepareStatement(insertStr)) {
            st.setString(1, user.getId());
            st.setString(2, user.getName());
            st.setString(3, user.getEmail());
            st.setString(4, user.getPassword());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void update(User user) {
        String updateStr = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(updateStr)) {
            st.setString(1, user.getName());
            st.setString(2, user.getEmail());
            st.setString(3, user.getPassword());
            st.setString(4, user.getId());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void delete(User user) {
        String deleteStr = "DELETE FROM users WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(deleteStr)) {
            st.setString(1, user.getId());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }
}
