package com.academia.service.impl;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.academia.dao.UserDao;
import com.academia.model.Role;
import com.academia.model.User;
import com.academia.model.UserStatus;

@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserDao userDao;
	
	@Override
	@Transactional(readOnly=true)
	public UserDetails loadUserByUsername(String usuario)
			throws UsernameNotFoundException {
		
		User user = userDao.findUserByName(usuario);
		
		if(user!=null){
			String pass = user.getPass();
			boolean enabled = user.getStatus().equals(UserStatus.ACTIVE);
			boolean accountNonExpired = user.getStatus().equals(UserStatus.ACTIVE);
			boolean credentialsNonExpired = user.getStatus().equals(UserStatus.ACTIVE);
			boolean accountNonLocked = user.getStatus().equals(UserStatus.ACTIVE);
			
			Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
			for(Role role: user.getRoles()){
				authorities.add(new GrantedAuthorityImpl(role.getDescripcion()));
			}
			org.springframework.security.core.userdetails.User securityUser = new 
					org.springframework.security.core.userdetails.User(usuario, pass, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
		return securityUser;
		}
		else{
			throw new UsernameNotFoundException("User Not Found!!");
		}
	}
	
	@Transactional
	public User findUserByName(String username){
		return userDao.findUserByName(username);
	}
	
}
