package com.printf.DDING.config.security;

import com.printf.DDING.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import javax.security.auth.Subject;
import java.security.Principal;
import java.util.Collection;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {
	private final Member principal; // 사용자 정보
	private String token; // JWT 문자열

//	// 인증 전 생성자 (토큰만 있을 때)
//	public JwtAuthenticationToken(String token) {
//		super(null);
//		this.token = token;
//		this.principal = null;
//		setAuthenticated(false); // 인증 전 상태
//	}

	public JwtAuthenticationToken(Member principal, Collection<? extends GrantedAuthority> authorities) {
		super(authorities);
		this.principal = principal;
		setAuthenticated(true);
	}

	@Override
	public Object getCredentials() {
		return null;
	}

	@Override
	public Object getPrincipal() {
		return principal;
	}
}
