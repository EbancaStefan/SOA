package com.example.springbootbackend.controller;

import com.example.springbootbackend.model.Favorite;
import com.example.springbootbackend.rabbitmq.RabbitMQJsonProducer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class RabbitMQJsonController {
    private RabbitMQJsonProducer jsonProducer;

    public RabbitMQJsonController(RabbitMQJsonProducer jsonProducer){
        this.jsonProducer = jsonProducer;
    }

    @PostMapping("/publish")
    public ResponseEntity<String> sendJsonMessage(@RequestBody Favorite favorite){
        jsonProducer.sendJsonMessage(favorite);
        return ResponseEntity.ok("Message sent to RabbitMq.");
    }
}
