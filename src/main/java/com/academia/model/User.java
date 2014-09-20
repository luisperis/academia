package com.academia.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="user")
public class User {
	@Id
	@GeneratedValue
	private int id;
	private String usuario;
	private String pass;
	@ManyToMany
	@JoinTable(name="usersandroles",
			joinColumns=@JoinColumn(name="userid"),
			inverseJoinColumns=@JoinColumn(name="rolid"))
	private List<Role> roles;
	@Enumerated(EnumType.STRING)
	private UserStatus status;
	
	public User(){}

	public User(int id, String usuario, String pass, List<Role> roles,
			UserStatus status) {
		super();
		this.id = id;
		this.usuario = usuario;
		this.pass = pass;
		this.roles = roles;
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public UserStatus getStatus() {
		return status;
	}

	public void setStatus(UserStatus status) {
		this.status = status;
	}

}
