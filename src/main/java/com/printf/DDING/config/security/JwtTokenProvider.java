package com.printf.DDING.config.security;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Slf4j
@Component
// JwtToken 생성/인증
public class JwtTokenProvider {
	private SecretKey secretKey; // 비밀키
	private long validityInMilliseconds; // 유효시간 1시간

	@PostConstruct // IoC 컨테이너에 등록될 때 .env의 데이터를 불러옴
	public void init() {
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

		// 🔐 .env에서 Base64 키 불러오기 및 디코딩
		String keyBase64 = dotenv.get("JWT_SECRET_KEY");
		byte[] keyBytes = Base64.getDecoder().decode(keyBase64);
		this.secretKey = Keys.hmacShaKeyFor(keyBytes);

		this.validityInMilliseconds = Long.parseLong(dotenv.get("JWT_EXPIRATION"));
	}

	// JWT 토큰 생성 메서드
	public String createToken(String email, String role) {
		Date now = new Date();
		Date validity = new Date(now.getTime() + validityInMilliseconds); // 유효 기간 설정

		return Jwts.builder()
				.setSubject(email)  // 사용자의 이메일을 Subject로 설정
				.claim("role", role) // 역할 정보 (예: USER, ADMIN)
				.setIssuedAt(now)   // 발급 시간
				.setExpiration(validity)  // 만료 시간 설정
				.signWith(SignatureAlgorithm.HS256, secretKey)  // 비밀 키로 서명 설정
				.compact();  // JWT 토큰 생성
	}

	public String getEmail(String token) {
		return Jwts.parser()
				.setSigningKey(secretKey)
				.parseClaimsJws(token)
				.getBody()
				.getSubject();  // 보통 이메일은 subject로 넣음
	}

	//  * HTTP 요청의 Authorization 헤더에서 JWT 토큰 값을 추출합니다.
	// *
	// * 클라이언트가 "Authorization: Bearer {token}" 형식으로 JWT를 전송할 때,
	// * "Bearer " 접두사를 제거하고 실제 토큰 문자열만 반환합니다.
	public String resolveToken(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization"); // 헤더에서 Authorization 값 추출
		return (bearerToken != null && bearerToken.startsWith("Bearer ")) // "Bearer "로 시작하면 토큰이므로
				? bearerToken.substring(7) // "Bearer " 이후 부분이 실제 토큰
				: null; // 토큰이 없으면 null 반환
	}

	// 토큰 유효성 검사
	public boolean validateToken(String token) {
		try {
			// 오류나면 catch로 넘어가기 때문에 false가 됨.
			Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
			return true;
		} catch (Exception e) {
			return false; 
		}
	}
}
