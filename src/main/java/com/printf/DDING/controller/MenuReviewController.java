package com.printf.DDING.controller;

import com.printf.DDING.service.MenuReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class MenuReviewController {
	private final MenuReviewService menuReviewService;

	@GetMapping("/review")
	public String reviewPage(@RequestParam String menuName, Model model) {
		model.addAttribute("menuName", menuName);
		return "review";
	}
}
