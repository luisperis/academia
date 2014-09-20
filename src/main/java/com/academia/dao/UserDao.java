package com.academia.dao;

import java.util.List;

import com.academia.model.User;

public interface UserDao {
	void addUser(User user);
	void editUser(User user);
	void deleteUser(int id);
	User findUser(int id);
	User findUserByName(String user);
	List<User> getAllUsers();

}
