package com.printf.DDING.entity;

import com.printf.DDING.entity.LoginType;
import com.printf.DDING.entity.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "member_tb")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int memberNo;

	@Column(length = 20, nullable = false)
	private String memberName;

	@Column(length = 20, nullable = false)
	private String memberNick;

	@Column(length = 30, nullable = false, unique = true)
	private String memberId;

	@Column(nullable = false)
	private String memberPass;

	@Column(length = 20, nullable = false, unique = true)
	private String memberPhone;

	@Column(length = 50, nullable = false, unique = true)
	private String memberEmail;

	@Column(length = 100)
	private String memberAddr;

	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private LoginType loginType;

	private String providerId;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;

	@PrePersist
	public void prePersist() {
		this.createdAt = LocalDateTime.now();
	}

	// Spring Security UserDetails 구현
	@Override public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singleton(role);
	}
	@Override public String getPassword() { return memberPass; }
	@Override public String getUsername() { return memberEmail; }
	@Override public boolean isAccountNonExpired() { return true; }
	@Override public boolean isAccountNonLocked() { return true; }
	@Override public boolean isCredentialsNonExpired() { return true; }
	@Override public boolean isEnabled() { return true; }
}
