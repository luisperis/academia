package com.academia.controller;



import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.academia.model.Alumno;
import com.academia.service.AlumnoService;


@Controller
public class AlumnoController {

	@Autowired
	private AlumnoService alumnoService;
	
	@RequestMapping(value={"/index","/"})
	public String setupForm(Map<String, Object> map){
		Alumno alumno = new Alumno();
		map.put("alumno", alumno);
		map.put("alumnoList", alumnoService.getAllAlumnos());
		return "home";
	}
	
	@RequestMapping(value={"/alumnos","/"})
	public String istaAlumnos(Map<String, Object> map){
		Alumno alumno = new Alumno();
		map.put("alumno", alumno);
		map.put("alumnoList", alumnoService.getAllAlumnos());
		return "alumno";
	}
	
	@RequestMapping(value="/alumno.do", method=RequestMethod.POST)
	public String doActions(@ModelAttribute Alumno alumno, BindingResult result, @RequestParam String action, Map<String, Object> map){
		Alumno alumnoResult = new Alumno();
		switch (action.toLowerCase()) {
		case "add":
			alumnoService.add(alumno);
			alumnoResult = alumno;
			break;
		case "edit":
			alumnoService.edit(alumno);
			alumnoResult = alumno;
			break;
		case "delete":
			alumnoService.deleteAlumno(alumno.getId());
			alumnoResult = new Alumno();
			break;
		case "search":
			Alumno searchedAlumno = alumnoService.getAlumno(alumno.getId());
			alumnoResult = searchedAlumno !=null ? searchedAlumno: new Alumno();
			break;
		}
		map.put("alumno", alumnoResult);
		map.put("alumnoList", alumnoService.getAllAlumnos());
		return "alumno";
	}
	
}
