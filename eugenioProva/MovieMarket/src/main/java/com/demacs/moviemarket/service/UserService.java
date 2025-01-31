package com.demacs.moviemarket.service;

import com.demacs.moviemarket.persistence.DBManager;
import com.demacs.moviemarket.persistence.model.User;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    // Metodo per registrare un nuovo utente
    public String registerUser(User user) {
        // Controllo se il database è disponibile
        if (DBManager.getInstance().getConnection() == null) return "SERVICE_UNAVAILABLE";

        // Verifico che tutti i campi obbligatori siano presenti
        if (user.getName() == null || user.getName().trim().isEmpty()) return "EMPTY_ATTR";
        if (user.getDob() == null) return "EMPTY_ATTR";
        if (user.getId() == null || user.getId().trim().isEmpty()) return "EMPTY_ATTR";
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) return "EMPTY_ATTR";
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) return "EMPTY_ATTR";

        // Verifico se l'email o l'ID sono già in uso
        if (DBManager.getInstance().getUserDao().findByEmail(user.getEmail()) != null) return "USED_EMAIL";
        if (DBManager.getInstance().getUserDao().findById(user.getId()) != null) return "USED_USERNAME";

        // Cripto la password
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);

        // Inserisco l'utente nel database
        if (DBManager.getInstance().getUserDao().insert(user)) {
            return "USER_SAVED";
        }

        return "USER_SAVE_FAILED";
    }

    // Metodo per effettuare il login
    public User loginUser(String email, String password) {
        User user = DBManager.getInstance().getUserDao().findByEmail(email);
        if (user != null && BCrypt.checkpw(password, user.getPassword())) {
            return user; // Login riuscito
        }
        return null; // Login fallito
    }
}
