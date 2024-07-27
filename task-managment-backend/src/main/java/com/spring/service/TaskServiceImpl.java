package com.spring.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.spring.model.Task;
import com.spring.model.User;
import com.spring.repository.TaskRepository;

@Service
public class TaskServiceImpl {
	@Autowired
	private TaskRepository taskRepository;

	public LocalDate getLocalDate() {
		Date dateToConvert = new Date();
		return dateToConvert.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
	}

	public TaskServiceImpl(TaskRepository taskRepository) {
		this.taskRepository = taskRepository;
	}

	public Task createTask(Task task) {
		long timeStamp = new Date().getTime();
		task.setCreateDate(timeStamp);
		task.setUpdateDate(timeStamp);
		return taskRepository.save(task);
	}

	public Task updateTask(Long id, Task updatedTask) {
		Task task = taskRepository.getOne(id);
		task.setName(updatedTask.getName());
		task.setDescription(updatedTask.getDescription());
		task.setDate(updatedTask.getDate());
		task.setCompleted(updatedTask.isCompleted());
		task.setPriority(updatedTask.getPriority());
		long timestamp = new Date().getTime();
		task.setUpdateDate(timestamp);
		task.setDeadlineDate(updatedTask.getDeadlineDate());
		if (updatedTask.isCompleted()) {
			task.setCompleteDate(timestamp);
		}
		System.out.println("######" + updatedTask.isCompleted());
		return taskRepository.save(task);
	}

	public void deleteTask(Long id) {
		this.taskRepository.deleteById(id);
	}

	public List<Task> findAll() {
		return taskRepository.findAll();
	}

	public List<Task> findByOwnerOrderByDateDesc(User user) {
		return taskRepository.findByOwnerOrderByDateDesc(user);
	}

	public Task setTaskCompleted(Long id) {
		Task task = taskRepository.getOne(id);
		task.setCompleted(true);
		return taskRepository.save(task);
	}

	public Task setTaskNotCompleted(Long id) {
		Task task = taskRepository.getOne(id);
		task.setCompleted(false);
		return taskRepository.save(task);
	}

	public List<Task> findFreeTasks() {
		return taskRepository.findAll().stream().filter(task -> task.getOwner() == null && !task.isCompleted())
				.collect(Collectors.toList());

	}

	public Task getTaskById(Long id) {
		return taskRepository.findById(id).orElse(null);
	}

	public Task assignTaskToUser(Task task, User user) {
		task.setOwner(user);
		return taskRepository.save(task);
	}

	public Task unassignTask(Task task) {
		task.setOwner(null);
		return taskRepository.save(task);
	}

}
