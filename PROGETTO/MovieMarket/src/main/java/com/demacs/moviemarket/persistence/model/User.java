package com.demacs.moviemarket.persistence.model;

import java.util.Date;

public class User {

    private String id;
    private String name;
    private String email;
    private Date Dob;
    private String password;

    // Getter e setter per id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Getter e setter per name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter e setter per email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter e setter per password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getDob() {
        return Dob;
    }
    public void setDob(Date dob) {
        this.Dob = dob;
    }
}
