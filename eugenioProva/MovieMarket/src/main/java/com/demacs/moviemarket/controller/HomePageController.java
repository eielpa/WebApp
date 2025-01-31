package com.demacs.moviemarket.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomePageController {

    @GetMapping("/")
    public String redirectToAngular() {
        // Il redirect va alla home page dell'app Angular
        return "redirect:http://localhost:4200";
    }
}
