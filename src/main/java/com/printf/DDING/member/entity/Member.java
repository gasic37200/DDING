package com.printf.DDING.member.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "member_tb") // 테이블 이름 명시
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member implements UserDetails {

	@Id // 기본키(PK) 지정
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment
	private int memberNo; // 회원 번호

	private String memberName; // 회원 이름

	@Column(unique = true)
	private String memberId; // 사용자 ID (일반 로그인에 사용)

	private String memberPass; // 비밀번호 (일반 로그인에 사용)

	@Column(unique = true)
	private String memberPhone; // 전화번호

	@Column(unique = true)
	private String memberEmail; // 이메일 (JWT 로그인 시 ID로 사용)

	private String memberAddr; // 주소

	private String memberDate; // 가입 일자

	@Enumerated(EnumType.STRING) // Enum을 문자열로 저장
	private LoginType loginType; // 로그인 방식 (LOCAL, KAKAO 등)

	private String providerId; // 소셜 로그인 시 유저 식별자

	@Enumerated(EnumType.STRING)
	private Role role; // 권한 정보 (ROLE_USER, ROLE_ADMIN)

	// ▼ Spring Security의 UserDetails 구현 메서드

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singleton(role); // 하나의 권한만 가진다고 가정
	}

	@Override
	public String getPassword() {
		return memberPass; // 비밀번호 반환
	}

	@Override
	public String getUsername() {
		return memberEmail; // 로그인 ID로 이메일 사용
	}

	@Override
	public boolean isAccountNonExpired() {
		return true; // 계정 만료 여부 (true: 만료 안 됨)
	}

	@Override
	public boolean isAccountNonLocked() {
		return true; // 계정 잠금 여부
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true; // 비밀번호 만료 여부
	}

	@Override
	public boolean isEnabled() {
		return true; // 계정 활성화 여부
	}
}