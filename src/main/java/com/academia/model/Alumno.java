package com.academia.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="alumno")
public class Alumno {

		// BEGIN PROPERTIES
		@Id
		@Column
		@GeneratedValue
		private long id;
		@Column
		private long idtutor;
		@Column
		private String nombre;
		@Column
		private String apellidos;
		@Column
		private String direccion;
		@Column
		private String correo;
		@Column
		private String telefono;
		@Column
		private String dni;
		@Column
		private Date fechaalta;
		@Column
		private boolean estado;
		// END PROPERTIES
		
		// BEGIN CONSTRUCTORS
		public Alumno(){
			
		}
		
		public Alumno(long idtutor, String nombre, String apellidos,
				String direccion, String correo, String telefono, String dni,
				Date fechaalta, boolean estado)
		{
			this.idtutor = idtutor;
			this.nombre = nombre;
			this.apellidos = apellidos;
			this.direccion = direccion;
			this.correo = correo;
			this.telefono = telefono;
			this.dni = dni;
			this.fechaalta = fechaalta;
			this.estado = estado;
		}
		
		// END CONSTRUCTORS
		
		
		// BEGIN GETTERS AND SETTERS
		public long getId() {
			return id;
		}
		public void setId(long id) {
			this.id = id;
		}
		public long getIdtutor() {
			return idtutor;
		}
		public void setIdtutor(long idtutor) {
			this.idtutor = idtutor;
		}
		public String getNombre() {
			return nombre;
		}
		public void setNombre(String nombre) {
			this.nombre = nombre;
		}
		public String getApellidos() {
			return apellidos;
		}

		public void setApellidos(String apellidos) {
			this.apellidos = apellidos;
		}
		public String getDireccion() {
			return direccion;
		}
		public void setDireccion(String direccion) {
			this.direccion = direccion;
		}
		public String getCorreo() {
			return correo;
		}
		public void setCorreo(String correo) {
			this.correo = correo;
		}
		public String getTelefono() {
			return telefono;
		}
		public void setTelefono(String telefono) {
			this.telefono = telefono;
		}
		public String getDni() {
			return dni;
		}
		public void setDni(String dni) {
			this.dni = dni;
		}
		public Date getFechaalta() {
			return fechaalta;
		}
		public void setFechaalta(Date fechaalta) {
			this.fechaalta = fechaalta;
		}
		
		public boolean isEstado() {
			return estado;
		}

		public void setEstado(boolean estado) {
			this.estado = estado;
		}
		
		// END GETTERS AND SETTERS
		
	}

