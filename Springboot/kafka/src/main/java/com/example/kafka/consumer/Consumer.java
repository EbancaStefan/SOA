package com.example.kafka.consumer;

import com.example.kafka.exception.ResourceNotFoundException;
import com.example.kafka.model.Favorite;
import com.example.kafka.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class Consumer {
    @Autowired
    private FavoriteRepository favoriteRepository;

    @KafkaListener(topics = "test_topic",groupId = "group_id")
    public ResponseEntity<Favorite> consumeMessage(String message){
        Favorite updatedFavorite = favoriteRepository.findById(Long.parseLong(message)).orElseThrow(()->new ResourceNotFoundException("Book not found with id: " + Long.parseLong(message)));
        updatedFavorite.setRecommend(true);
        favoriteRepository.save(updatedFavorite);
        return ResponseEntity.ok(updatedFavorite);
    }
}
