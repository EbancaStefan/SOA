package com.example.springbootbackend.controller;

import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.Book;
import com.example.springbootbackend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @GetMapping("/books")
    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    @PostMapping("/books")
    public Book createBook(@RequestBody Book book)
    {
        return bookRepository.save(book);
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable long id){
        Book book = bookRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Book not found with id: " + id));
        return ResponseEntity.ok(book);
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable long id, @RequestBody Book bookDetails){
        Book updateBook = bookRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Book not found with id: " + id));

        updateBook.setTotalPages(bookDetails.getTotalPages());
        updateBook.setPagesRead((bookDetails.getPagesRead()));
        updateBook.setName(bookDetails.getName());

        bookRepository.save(updateBook);
        return ResponseEntity.ok(updateBook);
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<Book> deleteProduct(@PathVariable long id){
        Book book = bookRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Book not found with id: " + id));

        bookRepository.delete(book);
        return ResponseEntity.ok(book);
    }
}
