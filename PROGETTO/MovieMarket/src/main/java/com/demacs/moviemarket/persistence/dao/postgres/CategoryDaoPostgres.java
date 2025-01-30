package com.demacs.moviemarket.persistence.dao.postgres;

import com.demacs.moviemarket.persistence.dao.CategoryDao;
import com.demacs.moviemarket.persistence.model.Category;
import com.demacs.moviemarket.persistence.DBManager;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CategoryDaoPostgres implements CategoryDao {

    private final Connection conn;

    // Modifica del costruttore per ricevere DBManager
    public CategoryDaoPostgres(DBManager dbManager) {
        this.conn = dbManager.getConnection();  // Ottieni la connessione tramite DBManager
    }

    @Override
    public Category findById(int id) {
        Category category = null;
        String query = "SELECT * FROM categories WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(query)) {
            st.setInt(1, id);
            ResultSet rs = st.executeQuery();

            if (rs.next()) {
                category = new Category();
                category.setId(rs.getInt("id"));
                category.setName(rs.getString("name"));
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }

        return category;
    }

    @Override
    public List<Category> findAll() {
        List<Category> categories = new ArrayList<>();
        String query = "SELECT * FROM categories";
        try (Statement st = conn.createStatement()) {
            ResultSet rs = st.executeQuery(query);

            while (rs.next()) {
                Category category = new Category();
                category.setId(rs.getInt("id"));
                category.setName(rs.getString("name"));
                categories.add(category);
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }

        return categories;
    }

    @Override
    public void save(Category category) {
        String insertStr = "INSERT INTO categories (name) VALUES (?)";
        try (PreparedStatement st = conn.prepareStatement(insertStr)) {
            st.setString(1, category.getName());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void update(Category category) {
        String updateStr = "UPDATE categories SET name = ? WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(updateStr)) {
            st.setString(1, category.getName());
            st.setInt(2, category.getId());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void delete(Category category) {
        String deleteStr = "DELETE FROM categories WHERE id = ?";
        try (PreparedStatement st = conn.prepareStatement(deleteStr)) {
            st.setInt(1, category.getId());
            st.executeUpdate();
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
    }
}
