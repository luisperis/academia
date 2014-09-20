package com.academia.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.academia.dao.AlumnoDao;
import com.academia.model.Alumno;

@Repository
public class AlumnoDaoImpl implements AlumnoDao {

	@Autowired
	private SessionFactory session;
	
	@Override
	public void add(Alumno alumno) {
		session.getCurrentSession().save(alumno);

	}

	@Override
	public void edit(Alumno alumno) {
		session.getCurrentSession().update(alumno);

	}

	@Override
	public void deleteAlumno(long id) {
		session.getCurrentSession().delete(getAlumno(id));

	}

	@Override
	public Alumno getAlumno(long id) {
		return (Alumno)session.getCurrentSession().get(Alumno.class, id);
	}

//	@Override
//	public Alumno findAlumnoByName(String usname) {
//		// TODO Auto-generated method stub
//		return null;
//	}

	@Override
	public List getAllAlumnos() {
		return session.getCurrentSession().createQuery("from Alumno").list();
	}

}
