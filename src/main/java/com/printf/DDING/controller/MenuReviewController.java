package com.printf.DDING.controller;

import com.printf.DDING.dto.MenuReviewRequest;
import com.printf.DDING.entity.Member;
import com.printf.DDING.entity.MenuReview;
import com.printf.DDING.service.MenuReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MenuReviewController {
	private final MenuReviewService menuReviewService;

	@GetMapping("/menu-review")
	public String reviewPage(@RequestParam String menuName, Model model) {
		model.addAttribute("menuName", menuName);
		return "review";
	}

	@GetMapping("/menu-review/listUp")
	@ResponseBody
	public List<MenuReview> reviewListUp(@RequestParam String menuName) {
		return menuReviewService.getReviews(menuName);
	}

	@PostMapping("/menu-review/save")
	@ResponseBody
	public void reviewSave(@AuthenticationPrincipal Member member,
						   @RequestBody MenuReviewRequest menuReviewRequest) {
		System.out.println(member);
		menuReviewService.saveReview(member,
				menuReviewRequest.getMenuName(),
				menuReviewRequest.getReviewContent(),
				menuReviewRequest.getReviewRate());
	}

	// 리뷰 등록
//	@PostMapping
//	public ResponseEntity<Void> saveReview(@RequestBody MenuReviewService review) {
//		menuReviewService.save(review);
//		return ResponseEntity.ok().build();
//	}
}
