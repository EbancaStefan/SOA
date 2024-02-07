package com.example.rabbit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@PropertySource("classpath:first.properties")
public class SpringbootRabbitApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootRabbitApplication.class, args);
    }

}
