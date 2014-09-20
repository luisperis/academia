package com.academia.dao;

import java.util.List;

import com.academia.model.Alumno;

public interface AlumnoDao {
	public void add(Alumno alumno);
	public void edit(Alumno alumno);
	void deleteAlumno(long id);
	Alumno getAlumno(long id);
//	Alumno findAlumnoByName(String usname);
	List<Alumno> getAllAlumnos();

}
