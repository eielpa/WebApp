package com.demacs.moviemarket.persistence;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;
import java.io.FileInputStream;
import java.io.IOException;

import com.demacs.moviemarket.persistence.dao.CategoryDao;
import com.demacs.moviemarket.persistence.dao.MovieDao;
import com.demacs.moviemarket.persistence.dao.PersonalLibraryDao;
import com.demacs.moviemarket.persistence.dao.UserDao;
import com.demacs.moviemarket.persistence.dao.postgres.UserDaoPostgres;
import com.demacs.moviemarket.persistence.dao.postgres.PersonalLibraryDaoPostgres;
import com.demacs.moviemarket.persistence.dao.postgres.MovieDaoPostgres;
import com.demacs.moviemarket.persistence.dao.postgres.DownloadDaoPostgres;
import com.demacs.moviemarket.persistence.dao.postgres.CategoryDaoPostgres;

public class DBManager {
    private static DBManager instance = null;
    private String url;
    private String username;
    private String password;

    public static DBManager getInstance() {
        if (instance == null) {
            instance = new DBManager();
        }
        return instance;
    }

    private DBManager() {
        // Carica il file di configurazione
        try (FileInputStream fis = new FileInputStream("src/main/resources/application.properties")) {
            Properties properties = new Properties();
            properties.load(fis);
            this.url = properties.getProperty("spring.datasource.url");
            this.username = properties.getProperty("spring.datasource.username");
            this.password = properties.getProperty("spring.datasource.password");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    Connection conn = null;

    public Connection getConnection() {
        if (conn == null) {
            try {
                conn = DriverManager.getConnection(url, username, password);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return conn;
    }

    public MovieDao getMovieDao() {
        return new MovieDaoPostgres(getConnection());
    }
    public CategoryDao getCategoryDao() {
        return new CategoryDaoPostgres(getConnection());
    }
    public PersonalLibraryDao getPersonalLibraryDao() {
        return new PersonalLibraryDaoPostgres(getConnection());
    }
    public UserDao getUserDao() {
        return new UserDaoPostgres(getConnection());
    }
}
