package com.spring.service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.model.Task;
import com.spring.model.User;
import com.spring.repository.TaskRepository;

import com.spring.service.TaskServiceImpl;
import com.spring.service.UserServiceimpl;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping("/api/v1/task")
public class TaskController {
	@Autowired
	private TaskRepository taskRepository;

	@Autowired
	private TaskServiceImpl taskService;
	
	@Autowired
	private UserServiceimpl userService;

	@GetMapping("/all")
	public List<Task> getAllTask() {
		return taskService.findAll();
	}

	@PostMapping("/createtask")
	public Task createTask(@RequestBody Task task) {
		return taskService.createTask(task);
	}

	@DeleteMapping("/delete/{id}")
	public void deleteTask(@PathVariable long id) {
		taskService.deleteTask(id);
	}

	@PutMapping("update/{id}")
	public Task updateTask(@Valid @RequestBody Task t1, @PathVariable long id) {
		return taskService.updateTask(id, t1);
	}
	@GetMapping("/findByOwnerOrderByDateDesc/{id}")
	public List<Task> findByOwnerOrderByDateDesc(@PathVariable long id) {
		User user = userService.getUserById(id);
		return taskService.findByOwnerOrderByDateDesc(user);
	}
	@GetMapping("/freetask")
	List<Task> findFreeTasks(){
		return taskService.findFreeTasks();
	}
	@GetMapping("/gettaskbyid/{id}")
	Task getTaskById(@PathVariable long id) {
		return taskService.getTaskById(id);
	}
	
	@GetMapping("assigntask/{userId}/{taskId}")
    public Task assignTaskToUser(@PathVariable Long userId, @PathVariable Long taskId) {
        Task selectedTask = taskService.getTaskById(taskId);
        User selectedUser = userService.getUserById(userId);
        return taskService.assignTaskToUser(selectedTask, selectedUser);
    }
	
	@GetMapping("unassigntask/{userId}/{taskId}")
    public Task unassignTaskFromUser(@PathVariable Long userId, @PathVariable Long taskId) {
        Task selectedTask = taskService.getTaskById(taskId);
        return taskService.unassignTask(selectedTask);
    }
	@GetMapping("/task/mark-done/{id}")
    public Task setTaskCompleted(@PathVariable Long id) {
        return taskService.setTaskCompleted(id);
    }

    @GetMapping("/task/unmark-done/{id}")
    public Task setTaskNotCompleted(@PathVariable Long id) {
        return taskService.setTaskNotCompleted(id);
    }
    
    @PutMapping("/change-assignee")
	public Task changeTaskAsignee(@Valid @RequestBody Task t1) {
    	Task t = taskService.getTaskById(t1.getId());
    	User u = userService.getUserById(t1.getOwner().getId());
    	t.setOwner(u);
		return taskRepository.save(t);
	}
    
    @GetMapping("/change-status/{id}/{status}")
	public Task changeTaskStatus(@PathVariable long id, @PathVariable String status) {
		Task t = taskService.getTaskById(id);
		t.setTaskStatus(status);
		return taskRepository.save(t);
	}
    
    @GetMapping("/search")
	public List<Task> searchUsers(@RequestParam String searchText) {
		List<Task> searchResults = taskRepository.findByNameContainingIgnoreCase(searchText);
		return searchResults;
	}
    

}
