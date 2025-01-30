package com.demacs.moviemarket.service;

import com.demacs.moviemarket.persistence.dao.PersonalLibraryDao;
import com.demacs.moviemarket.persistence.model.PersonalLibrary;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PersonalLibraryService {

    private final PersonalLibraryDao personalLibraryDao;

    public PersonalLibraryService(PersonalLibraryDao personalLibraryDao) {
        this.personalLibraryDao = personalLibraryDao;
    }

    public PersonalLibrary findById(int id) {
        return personalLibraryDao.findById(id);
    }

    public List<PersonalLibrary> findAll() {
        return personalLibraryDao.findAll();
    }

    public void save(PersonalLibrary personalLibrary) {
        personalLibraryDao.save(personalLibrary);
    }

    public void update(PersonalLibrary personalLibrary) {
        personalLibraryDao.update(personalLibrary);
    }

    public void delete(PersonalLibrary personalLibrary) {
        personalLibraryDao.delete(personalLibrary);
    }
}
