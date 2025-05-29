package com.printf.DDING.config.security;

import com.printf.DDING.entity.Member;
import com.printf.DDING.service.MemberService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
// OncePerRequestFilter는 매 요청마다 한 번만 실행
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberService memberService;

	/**
	 * doFilterInternal 메서드는 실제로 요청을 가로채고, JWT를 검증한 뒤 인증 정보를 SecurityContext에 저장
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		// 1. JWT 토큰을 HTTP 헤더에서 추출
		String token = jwtTokenProvider.resolveToken(request);

		// 2. 토큰이 존재하고 유효하면, 인증 정보 설정
		if (token != null && jwtTokenProvider.validateToken(token)) {
			// 3. JWT에서 사용자 이메일(혹은 ID) 추출
			String memberEmail = jwtTokenProvider.getEmailFromJWT(token);

			// ✅ 여기서 MemberService로 DB에서 Member 조회
			Member member = memberService.findByEmail(memberEmail);

			System.out.println(member.getAuthorities());
			// 4. 인증 정보 생성 (기본적으로 인증된 사용자의 정보를 담음)
			JwtAuthenticationToken authentication =
					new JwtAuthenticationToken(member, member.getAuthorities());  // 인증 정보는 이메일과 권한 등

			// 5. 인증 정보를 SecurityContextHolder에 설정
			SecurityContextHolder.getContext().setAuthentication(authentication); // 이 정보를 이후 서비스에서 사용할 수 있음
		}

		filterChain.doFilter(request, response);
	}
}
