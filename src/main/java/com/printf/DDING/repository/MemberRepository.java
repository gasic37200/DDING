package com.printf.DDING.repository;

import com.printf.DDING.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Integer> {
	Optional<Member> findByMemberId(String memberId);
	Member findByMemberNo(int memberNo);
	Member findByMemberEmail(String memberEmail);
}
