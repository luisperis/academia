package com.academia.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.academia.dao.AlumnoDao;
import com.academia.model.Alumno;
import com.academia.service.AlumnoService;

@Service
public class AlumnoServiceImpl implements AlumnoService {

	@Autowired
	private AlumnoDao alumnoDao;
	
	@Transactional
	public void add(Alumno alumno) {
		alumnoDao.add(alumno);

	}

	@Transactional
	public void edit(Alumno alumno) {
		alumnoDao.edit(alumno);

	}

	@Transactional
	public void deleteAlumno(long id) {
		alumnoDao.deleteAlumno(id);

	}

	@Transactional
	public Alumno getAlumno(long id) {
		return  alumnoDao.getAlumno(id);
	}

//	@Transactional
//	public Alumno findAlumnoByName(String usname) {
//		// TODO Auto-generated method stub
//		return null;
//	}

	@Transactional
	public List<Alumno> getAllAlumnos() {
		return alumnoDao.getAllAlumnos();
	}

}
