package com.printf.DDING.member.controller;

import com.printf.DDING.config.security.JwtTokenProvider;
import com.printf.DDING.member.dto.LoginRequest;
import com.printf.DDING.member.dto.LoginResponse;
import com.printf.DDING.member.entity.Member;
import com.printf.DDING.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MemberController {
	public final MemberService memberService;
	private final JwtTokenProvider jwtTokenProvider;

	// JSON 방식 로그인 처리 (AJAX로 데이터 받기)
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> ajaxLogin(@RequestBody LoginRequest loginRequest) {
		System.out.println(loginRequest);
		Member member = memberService.login(
				loginRequest.getMemberInputId(),
				loginRequest.getMemberInputPass());

		if (member != null) {
			System.out.println(member.getMemberId());
			String token = jwtTokenProvider.createToken(member.getMemberEmail(), String.valueOf(member.getRole()));
			LoginResponse loginResponse = new LoginResponse(true, member.getMemberName(), token);
			return ResponseEntity.ok(loginResponse);
		}

		return ResponseEntity
				.status(401)  // 또는 HttpStatus.UNAUTHORIZED
				.body(new LoginResponse(false, null, null));
	}
}
