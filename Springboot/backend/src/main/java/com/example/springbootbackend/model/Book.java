package com.example.springbootbackend.model;

import javax.persistence.*;

@Entity
@Table(name="books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="name")
    private String name;

    @Column(name="totalPages")
    private int totalPages;

    @Column(name="pagesRead")
    private int pagesRead;

    public Book(){
    }

    public Book(long id, String name, int totalPages, int pagesRead) {
        this.id = id;
        this.name = name;
        this.totalPages = totalPages;
        this.pagesRead = pagesRead;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getPagesRead() {
        return pagesRead;
    }

    public void setPagesRead(int pagesread) {
        this.pagesRead = pagesread;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int price) {
        this.totalPages = price;
    }
}
