package com.printf.DDING.service;

import com.printf.DDING.entity.Member;
import com.printf.DDING.entity.MenuLike;
import com.printf.DDING.repository.MemberRepository;
import com.printf.DDING.repository.MenuLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MenuLikeService {
	private final MenuLikeRepository menuLikeRepository;
	private final MemberService memberService;
	private Member member = null;

	public Optional<MenuLike> findByMenuName(String menuName) {
		return menuLikeRepository.findByMenuName(menuName);
	}

	public MenuLike findByMemberAndMenuName(Member member, String menuName) {
		member = memberService.findByMemberNo(member.getMemberNo());
		return menuLikeRepository.findByMemberAndMenuName(member, menuName);
	}

	public int countMenuLike(String menuName) {
		return (int) findByMenuName(menuName).stream().count();
	}

	public boolean isMenuLiked(Member member, String menuName) {
		return findByMemberAndMenuName(member, menuName) != null;
	}

	public void toggleMenuLike(Member member, String menuName) {
		MenuLike menuLike = findByMemberAndMenuName(member, menuName);
		if (isMenuLiked(member, menuName)) {
			menuLikeRepository.delete(menuLike);
		} else {
			menuLikeRepository.save(new MenuLike(member, menuName));
		}
	}
}
