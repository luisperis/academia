package com.academia.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.academia.dao.UserDao;
import com.academia.model.User;
@Repository
public class UserDaoImpl implements UserDao {

	@Autowired
	private SessionFactory session;
	
	@Override
	public void addUser(User user) {
		session.getCurrentSession().save(user);

	}

	@Override
	public void editUser(User user) {
		session.getCurrentSession().update(user);

	}

	@Override
	public void deleteUser(int id) {
		session.getCurrentSession().delete(findUser(id));

	}

	@Override
	public User findUser(int id) {
		return (User) session.getCurrentSession().get(User.class, id);
	}

	@Override
	public User findUserByName(String user) {
		Criteria criteria = session.getCurrentSession().createCriteria(User.class);
		criteria.add(Restrictions.eq("usuario", user));
		return (User) criteria.uniqueResult();
	}

	@Override
	public List<User> getAllUsers() {
		return session.getCurrentSession().createQuery("from User").list();
	}

}
