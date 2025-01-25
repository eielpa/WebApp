package com.demacs.moviemarket.persistence.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class User {
    String id;
    String name;
    String email;
    String password;



    public User() {

    }


}