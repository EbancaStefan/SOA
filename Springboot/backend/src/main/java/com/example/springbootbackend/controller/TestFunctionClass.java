package com.example.springbootbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class TestFunctionClass {
    @GetMapping("/function/{pagesRead}")
    public ResponseEntity<Long> function(@PathVariable long pagesRead) {
        return ResponseEntity.ok(pagesRead+1);
    }
}
