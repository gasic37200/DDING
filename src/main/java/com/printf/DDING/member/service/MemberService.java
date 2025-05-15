package com.printf.DDING.member.service;

import com.printf.DDING.member.entity.Member;
import com.printf.DDING.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
	public final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;

	public Member login(String memberInputId, String memberInputPass) {
		return memberRepository.findByMemberId(memberInputId)
				.filter(member -> memberInputPass.equals(member.getMemberPass()))
//				.filter(member -> passwordEncoder.matches(member.getMemberPass(), memberInputPass))
				.orElse(null);
	}

	public void register(String memberId, String rawPassword) {
		String encodedPassword = passwordEncoder.encode(rawPassword); // 암호화
		Member member = new Member();
		member.setMemberId(memberId);
		member.setMemberPass(encodedPassword); // 암호화된 비밀번호 저장
		// ...나머지 값들 세팅
		memberRepository.save(member); // JPA든 MyBatis든 저장
	}

	public Member findByEmail(String memberEmail) {
		return memberRepository.findByMemberEmail(memberEmail);
	}
}
