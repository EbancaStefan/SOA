package com.example.springbootbackend.controller;

import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.Favorite;
import com.example.springbootbackend.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class FavoriteController {
    @Autowired
    private FavoriteRepository favoriteRepository;

    @GetMapping("/favorites")
    public List<Favorite> getAllFavorites(){
        return favoriteRepository.findAll();
    }

    @DeleteMapping("/favorites/{id}")
    public ResponseEntity<Favorite> deleteFavorite(@PathVariable long id){
        Favorite favorite = favoriteRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Favorite book not found with id: " + id));

        favoriteRepository.delete(favorite);

        return ResponseEntity.ok(favorite);
    }
}
