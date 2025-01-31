package com.demacs.moviemarket.controller;

import com.demacs.moviemarket.persistence.model.User;
import com.demacs.moviemarket.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public void loginOrRedirect(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (req.getSession().getAttribute("user") == null)
            resp.sendRedirect("login.html");
    }

    @GetMapping("/signin")
    public void signInRedirect(HttpServletResponse resp) throws IOException {
        resp.sendRedirect("signin.html");
    }

    @PostMapping(value = "/confirmRegistration")
    public String accountRegistration(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping(value = "/doLogin")
    public void accountLogin(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String email = req.getParameter("email");
        String password = req.getParameter("password");

        User user = userService.loginUser(email, password);
        HttpSession session = req.getSession();

        if (user != null) {
            session.setAttribute("user", user);
            session.setAttribute("sessionId", session.getId());
            req.getServletContext().setAttribute(session.getId(), session);
            res.sendRedirect("http://localhost:4200/?jsessionid=" + session.getId());
        } else {
            res.sendRedirect("http://localhost:8080/invalid.html");
        }
    }

    @GetMapping("/checkisLogged")
    @ResponseBody
    @CrossOrigin("http://localhost:4200/")
    public boolean checkLoggedIn(HttpServletRequest req, HttpServletResponse resp, @RequestParam String sessionId) {
        HttpSession session = (HttpSession) req.getServletContext().getAttribute(sessionId);
        User user = (User) session.getAttribute("user");
        return user != null;
    }
}
