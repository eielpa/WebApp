package com.demacs.moviemarket.controller;

import com.fasterxml.jackson.core.io.JsonStringEncoder;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import com.demacs.moviemarket.persistence.DBManager;
import com.demacs.moviemarket.persistence.model.User;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Arrays;


@RestController
public class AuthController {
    @GetMapping("/login")
    public void loginOrRedirect(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if( req.getSession().getAttribute("user") == null )
            resp.sendRedirect("login.html");
    }

    @GetMapping("/signin")
    public void signInRedirect(HttpServletResponse resp) throws IOException{
        resp.sendRedirect("signin.html");
    }

    @PostMapping(value = "/confirmRegistration")
    public String accountRegistration( @RequestBody User user ){
        //controllo se postgres è connesso
        if( DBManager.getInstance().getConnection() == null ) return "SERVICE_UNAVAILABLE";

        //controllo campi nulli
        if( user.getName() == null || user.getName().trim().isEmpty() ) return "EMPTY_ATTR";
        if( user.getDob() == null ) return "EMPTY_ATTR";
        if( user.getId() == null || user.getId().trim().isEmpty() ) return "EMPTY_ATTR";
        if( user.getEmail() == null || user.getEmail().trim().isEmpty() ) return "EMPTY_ATTR";
        if( user.getPassword() == null || user.getPassword().trim().isEmpty() ) return "EMPTY_ATTR";

        //controllo se l'email è già stata usata
        if( DBManager.getInstance().getUserDao().findByEmail(user.getEmail()) != null ) return "USED_EMAIL";
        // //controllo se ID è già stato usato
        if( DBManager.getInstance().getUserDao().findById(user.getId()) != null ) return "USED_USERNAME";

        //criptare la password
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);

        //inserire i campi nel database
        if( DBManager.getInstance().getUserDao().insert(user)){
            return "USER_SAVED";
        }

        return null;
    }

    @PostMapping(value = "/doLogin")
    public void accountLogin( HttpServletRequest req, HttpServletResponse res ) throws IOException{
        String email = req.getParameter("email");
        String password = req.getParameter("password");

        User utente = DBManager.getInstance().getUserDao().findByEmail(email);
        boolean login;
        HttpSession session = req.getSession();
        if( utente == null ) login = false;
        else{
            if( BCrypt.checkpw(password, utente.getPassword() ) ){
                login = true;
                session.setAttribute("user", utente);
                session.setAttribute("sessionId", session.getId());

                req.getServletContext().setAttribute(session.getId(), session);
            }
            else login = false;
        }

        if(login){
            res.sendRedirect("http://localhost:4200/?jsessionid="+session.getId());
        }
        else{
            res.sendRedirect("http://localhost:8080/invalid.html");
        }
    }


    @GetMapping("/checkisLogged")
    @ResponseBody
    @CrossOrigin("http://localhost:4200/")
    public boolean checkLoggedIn(HttpServletRequest req, HttpServletResponse resp, @RequestParam String sessionId){
        ServletContext context = req.getServletContext();
        HttpSession session = (HttpSession) context.getAttribute(sessionId);
        User user = (User) session.getAttribute("user");
        if(user != null){
            return true;
        }
        return false;
    }

}
