package com.demacs.moviemarket.service;

import com.demacs.moviemarket.persistence.DBManager;
import com.demacs.moviemarket.persistence.model.User;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.demacs.moviemarket.persistence.dao.UserDao;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public String registerUser(User user) {
        //System.out.println(user.getName());
        if (DBManager.getInstance().getConnection() == null) return "SERVICE_UNAVAILABLE";

        if (user.getName() == null || user.getName().trim().isEmpty()) return "EMPTY_ATTR";
        if (user.getDob() == null) return "EMPTY_ATTR";
        if (user.getId() == null || user.getId().trim().isEmpty()) return "EMPTY_ATTR";
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) return "EMPTY_ATTR";
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) return "EMPTY_ATTR";

        if (DBManager.getInstance().getUserDao().findByEmail(user.getEmail()) != null) return "USED_EMAIL";
        if (DBManager.getInstance().getUserDao().findById(user.getId()) != null) return "USED_USERNAME";

        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);

        if (DBManager.getInstance().getUserDao().insert(user)) {
            return "USER_SAVED";
        }

        return "USER_SAVE_FAILED";
    }

    public User loginUser(String email, String password) {
        User user = DBManager.getInstance().getUserDao().findByEmail(email);
        if (user != null && BCrypt.checkpw(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public User getUserByEmail(String email) {
        return userDao.findByEmail(email);
    }

    // Metodo per aggiornare la password
    public boolean updatePassword(String email, String newPassword) {
        User user = userDao.findByEmail(email);
        if (user != null) {
            user.setPassword(newPassword);  // Assicurati che il set della password funzioni correttamente
            userDao.update(user);
            return true;
        }
        return false;
    }
}
