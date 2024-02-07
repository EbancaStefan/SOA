package com.example.springbootbackend.dao;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Repository
public class User {
    private final static List<UserDetails> APPLICATION_USERS = Arrays.asList(
            new org.springframework.security.core.userdetails.User("user1", "user",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            ),
            new org.springframework.security.core.userdetails.User("user2", "user",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            ),
            new org.springframework.security.core.userdetails.User("user3", "user",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            ),
            new org.springframework.security.core.userdetails.User("user4", "user",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            ),
            new org.springframework.security.core.userdetails.User("user_pentru_web2", "user",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            ),
            new org.springframework.security.core.userdetails.User("user_pentru_web3", "user",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            )
    );

    public UserDetails findUserByUsername(String username){
        return APPLICATION_USERS
                .stream()
                .filter(u-> u.getUsername().equals(username))
                .findFirst()
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }
}
