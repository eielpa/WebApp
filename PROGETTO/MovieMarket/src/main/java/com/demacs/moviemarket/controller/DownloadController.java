package com.demacs.moviemarket.controller;

import com.demacs.moviemarket.persistence.model.Download;
import com.demacs.moviemarket.service.DownloadService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/downloads")
public class DownloadController {

    private final DownloadService downloadService;

    public DownloadController(DownloadService downloadService) {
        this.downloadService = downloadService;
    }

    @GetMapping("/{id}")
    public Download getDownload(@PathVariable int id) {
        return downloadService.findById(id);
    }

    @GetMapping
    public List<Download> getAllDownloads() {
        return downloadService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createDownload(@RequestBody Download download) {
        downloadService.save(download);
    }

    @PutMapping("/{id}")
    public void updateDownload(@PathVariable int id, @RequestBody Download download) {
        download.setId(id);  // Set the ID to ensure it updates the correct download
        downloadService.update(download);
    }

    @DeleteMapping("/{id}")
    public void deleteDownload(@PathVariable int id) {
        Download download = downloadService.findById(id);
        downloadService.delete(download);
    }
}
