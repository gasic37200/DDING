package com.printf.DDING.controller;

import com.printf.DDING.entity.Member;
import com.printf.DDING.service.MenuLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class MenuLikeController {
	private final MenuLikeService menuLikeService;

	@PostMapping("/menu_like/update")
	@ResponseBody
	public void toggleMenuLike(@AuthenticationPrincipal Member member,
							   @RequestBody String menuName) {
		System.out.println("update 실행됨");
		menuLikeService.toggleMenuLike(member, menuName);
	}
}
