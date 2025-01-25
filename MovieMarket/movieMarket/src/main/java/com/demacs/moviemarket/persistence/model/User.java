package com.demacs.moviemarket.persistence.model;

import java.util.Date;

public class User {
    String id;
    String name;
    String email;
    String password;



    public User() {

    }

    public String getId() {
        return id;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getCognome() {
        return cognome;
    }
    public void setCognome(String cognome) {
        this.cognome = cognome;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Date getData_di_nascita() {
        return data_di_nascita;
    }
    public void setData_di_nascita(Date data_di_nascita) {
        this.data_di_nascita = data_di_nascita;
    }
    public Boolean getModeratore() {
        return moderatore;
    }
    public void setModeratore(Boolean moderatore) {
        this.moderatore = moderatore;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }



}