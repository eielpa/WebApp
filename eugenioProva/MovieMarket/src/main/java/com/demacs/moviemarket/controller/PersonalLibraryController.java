package com.demacs.moviemarket.controller;

import com.demacs.moviemarket.persistence.model.PersonalLibrary;
import com.demacs.moviemarket.service.PersonalLibraryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personal-libraries")
public class PersonalLibraryController {

    private final PersonalLibraryService personalLibraryService;

    public PersonalLibraryController(PersonalLibraryService personalLibraryService) {
        this.personalLibraryService = personalLibraryService;
    }

    @GetMapping("/{id}")
    public PersonalLibrary getPersonalLibrary(@PathVariable int id) {
        return personalLibraryService.findById(id);
    }

    @GetMapping
    public List<PersonalLibrary> getAllPersonalLibraries() {
        return personalLibraryService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createPersonalLibrary(@RequestBody PersonalLibrary personalLibrary) {
        personalLibraryService.save(personalLibrary);
    }

    @PutMapping("/{id}")
    public void updatePersonalLibrary(@PathVariable int id, @RequestBody PersonalLibrary personalLibrary) {
        personalLibrary.setId(id);  // Set the ID to ensure it updates the correct entry
        personalLibraryService.update(personalLibrary);
    }

    @DeleteMapping("/{id}")
    public void deletePersonalLibrary(@PathVariable int id) {
        PersonalLibrary personalLibrary = personalLibraryService.findById(id);
        personalLibraryService.delete(personalLibrary);
    }
}
