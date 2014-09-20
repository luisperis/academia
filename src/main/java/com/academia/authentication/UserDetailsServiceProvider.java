package com.academia.authentication;

import org.springframework.security.core.context.SecurityContextHolder;

import com.academia.model.User;

public class UserDetailsServiceProvider {
	private static UsuarioDetailsService usuarioDetailsService = new UsuarioDetailsService();
	
	public static User get(){
		return (User) usuarioDetailsService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
	}

}
