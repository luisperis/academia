package com.academia.service;

import java.util.List;

import com.academia.model.Alumno;

public interface AlumnoService {

	public void add(Alumno alumno);
	public void edit(Alumno alumno);
	void deleteAlumno(long l);
	Alumno getAlumno(long id);
//	Alumno findAlumnoByName(String usname);
	List<Alumno> getAllAlumnos();
	
}
