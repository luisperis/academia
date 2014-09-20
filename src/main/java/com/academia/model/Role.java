package com.academia.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
@Entity
@Table(name="role")
public class Role {
	@Id
	@GeneratedValue
	private int id;
	private String descripcion;
	@ManyToMany(mappedBy ="roles")
	private List<User> users;
	
	public Role(){}

	public Role(int id, String descripcion, List<User> users) {
		super();
		this.id = id;
		this.descripcion = descripcion;
		this.users = users;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}
}
