package com.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.model.User;




@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	public User findByEmailAndPassword(String email,String password); 
	List<User> findByFirstNameContainingIgnoreCase(String searchText);
	User findByEmail(String email);
}
