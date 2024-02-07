package com.example.rabbit.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@Table(name="favorites")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="bookName")
    private String bookName;

    @Nullable
    @Column(name="recommend")
    private boolean recommend;

    public Favorite() {
    }

    public Favorite(long id, String bookName) {
        this.id = id;
        this.bookName = bookName;
        this.recommend = false;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String productName) {
        this.bookName = productName;
    }

    public boolean getRecommend() {
        return recommend;
    }

    public void setRecommend(boolean completed) {
        this.recommend = completed;
    }
}
