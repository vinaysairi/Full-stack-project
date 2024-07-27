package com.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.model.User;
import com.spring.repository.UserRepository;



@Service
public class UserServiceimpl {

	 @Autowired
	  private UserRepository userRepository;	 

	public User loginUser(User user) throws Exception {
		User loggedInUser = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
		if (loggedInUser == null) {
			throw new Exception("User not found");
		}
		return loggedInUser;
	}
	

	public List<User> searchUsers(String searchText) {
		return userRepository.findByFirstNameContainingIgnoreCase(searchText);
	}
	public User getUserById(Long id) {
		return userRepository.findById(id).orElse(null);
	}

}
