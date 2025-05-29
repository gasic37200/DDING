package com.printf.DDING.repository;

import com.printf.DDING.entity.Member;
import com.printf.DDING.entity.MenuLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MenuLikeRepository extends JpaRepository<MenuLike, Integer> {
	Optional<MenuLike> findByMenuName(String menuName);

	MenuLike findByMemberAndMenuName(Member member, String menuName);
}
