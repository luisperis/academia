package com.academia.authentication;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.academia.dao.UserDao;
import com.academia.model.User;

public class UsuarioDetailsService implements UserDetailsService {
	
	@Autowired
	private UserDao userDao;
	

	@Override
	public UserDetails loadUserByUsername(String username) 	throws UsernameNotFoundException {
		User user = new User();
		user = userDao.findUserByName(username);
		
		if(user != null){
			List<GrantedAuthority> grandAuths = new ArrayList<GrantedAuthority>();
			grandAuths.add(new SimpleGrantedAuthority("ADMIN"));
			
			
		}
		else{
			
		}
		
		return (UserDetails) user;
	}

}
