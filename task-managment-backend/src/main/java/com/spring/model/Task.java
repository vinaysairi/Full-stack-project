package com.spring.model;

import java.util.Objects;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Task {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "task_id")
	private Long id;
	@NotEmpty(message = "{task.name.not.empty}")
	private String name;
	@NotEmpty(message = "{task.description.not.empty}")
	@Column(length = 1200)
	@Size(max = 1200, message = "{task.description.size}")
	private String description;
	@NotNull(message = "{task.date.not.null}")

	private long date;
	private boolean isCompleted;
	private String creatorName;
	private String priority; // high, medium, low

	private long updateDate;

	private long completeDate;

	private long createDate;
	@ManyToOne
	@JoinColumn(name = "id")
	private User owner;

	public String getTaskStatus() {
		return taskStatus;
	}

	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}

	private String taskStatus;

	public Task() {
	}

	public long getDeadlineDate() {
		return deadlineDate;
	}

	public void setDeadlineDate(long deadlineDate) {
		this.deadlineDate = deadlineDate;
	}

	private long deadlineDate;

	public Task(@NotEmpty String name, @NotEmpty @Size(max = 1200) String description, @NotNull long date,
			boolean isCompleted, String creatorName) {
		this.name = name;
		this.description = description;
		this.date = date;
		this.isCompleted = isCompleted;
		this.creatorName = creatorName;
	}

	public Task(@NotEmpty String name, @NotEmpty @Size(max = 1200) String description, @NotNull long date,
			boolean isCompleted, String creatorName, User owner) {
		this.name = name;
		this.description = description;
		this.date = date;
		this.isCompleted = isCompleted;
		this.creatorName = creatorName;
		this.owner = owner;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getDate() {
		return date;
	}

	public void setDate(long date) {
		this.date = date;
	}

	public boolean isCompleted() {
		return isCompleted;
	}

	public void setCompleted(boolean completed) {
		isCompleted = completed;
	}

	public String getCreatorName() {
		return creatorName;
	}

	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public long getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(long updateDate) {
		this.updateDate = updateDate;
	}

	public long getCompleteDate() {
		return completeDate;
	}

	public void setCompleteDate(long completeDate) {
		this.completeDate = completeDate;
	}

	public long getCreateDate() {
		return createDate;
	}

	public void setCreateDate(long createDate) {
		this.createDate = createDate;
	}

//	@Override
//	public int hashCode() {
//		return Objects.hash(id, name, description, date, isCompleted, creatorName, owner);
//	}
}