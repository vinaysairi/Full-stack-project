package com.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.model.Task;
import com.spring.model.User;

public interface TaskRepository extends JpaRepository<Task, Long>{
	List<Task> findByOwnerOrderByDateDesc(User user);
	List<Task> findByNameContainingIgnoreCase(String searchText);

}
