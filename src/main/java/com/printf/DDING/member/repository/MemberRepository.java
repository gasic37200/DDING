package com.printf.DDING.member.repository;

import com.printf.DDING.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Integer> {
	Optional<Member> findByMemberId(String memberId);
	Member findByMemberEmail(String memberEmail);
}
