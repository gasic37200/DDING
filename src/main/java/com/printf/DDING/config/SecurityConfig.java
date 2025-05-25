package com.printf.DDING.config;

import com.printf.DDING.config.security.JwtAuthenticationFilter;
import com.printf.DDING.config.security.JwtTokenProvider;
import com.printf.DDING.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration // 이 클래스가 설정 클래스임을 명시
@EnableWebSecurity  // 이 어노테이션은 스프링 시큐리티 설정을 활성화
@RequiredArgsConstructor // 의존성 자동 주입
public class SecurityConfig {
	private final JwtTokenProvider jwtTokenProvider; // JWT 토큰을 다루는 클래스 주입

	/**
	 * Spring Security의 핵심 설정을 담당하는 필터 체인 메서드
	 * 여기서 URL별 인증 여부, 필터 등록 등을 지정
	 */
	// SecurityFilterChain을 빈으로 등록하여 보안 설정을 정의
	@Bean
	public DefaultSecurityFilterChain springFilterChain(
			HttpSecurity http,
			JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
		http
			.csrf(csrf -> csrf.disable()) // CSRF 보안 비활성화 (JWT 사용 시 필요 없음)
			.formLogin(form -> form.disable()) // 기본 로그인 폼 사용 안 함 (커스텀 처리)
			.httpBasic(httpBasic -> httpBasic.disable()) // HTTP Basic 인증도 비활성화

			// 요청 URL에 대한 권한 설정
			.authorizeHttpRequests(auth -> auth
					// ✅ 누구나 접근 가능한 URL
						.requestMatchers(
								"/",                      // 루트 경로
								"/login", "/signup", "/findMenu",     // 로그인/회원가입 관련
								"/assets/**", "/static/**",
								"/favicon.ico"           // 파비콘 요청도 막지 않게
						).permitAll()

					// ✅ 회원만 접근 가능한 URL
					.requestMatchers("/board/write", "/board/save", "/board/favorite/**", "/mypage/**").authenticated()

					// 🔒 나머지는 기본적으로 인증 필요
					.anyRequest().authenticated()
			)

			// ✅ 커스텀 JWT 필터를 UsernamePasswordAuthenticationFilter 앞에 등록
			.addFilterBefore(jwtAuthenticationFilter,
					UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter(MemberService memberService) {
		return new JwtAuthenticationFilter(jwtTokenProvider, memberService);
	}

	/**
	 * 비밀번호 암호화 처리를 위한 빈 등록
	 * BCrypt는 현재 가장 보편적이고 안전한 암호화 방식
	 */
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
