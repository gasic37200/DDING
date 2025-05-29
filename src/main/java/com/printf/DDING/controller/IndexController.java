package com.printf.DDING.controller;

import com.printf.DDING.entity.Member;
import com.printf.DDING.service.IndexService;
import com.printf.DDING.service.MenuLikeService;
import com.printf.DDING.service.MenuReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class IndexController {
	public final IndexService indexService;
	public final MenuLikeService menuLikeService;
	public final MenuReviewService menuReviewService;

	@GetMapping("/")
	public String index() {
		return "index";
	}

	@GetMapping("/menu/find")
	@ResponseBody
	public String findMenuName(@DateTimeFormat(pattern = "yyyy-MM-dd")
							   @RequestParam("menuDate") Date menuDate) {
		String str = indexService.findMenuName(menuDate);
		if (str == null || str.trim().isEmpty()) {
			log.warn("❗ 식단이 존재하지 않음: " + menuDate);
			return "";
		}
		log.info("✅ 메뉴 문자열: " + str);
		return str;
	}

	@PostMapping("/menu/info")
	@ResponseBody
	public ResponseEntity<?> countByMenuLike(@AuthenticationPrincipal Member member,
											 @RequestBody String menuName) {
		System.out.println("💡 [menu/info] memberNo: " + member + ", menuName: " + menuName);
		boolean likedByMe = member != null && menuLikeService.isMenuLiked(member, menuName);
		System.out.println(likedByMe);
		int likeCount = menuLikeService.countMenuLike(menuName);
		int reviewCount = menuReviewService.countMenuReview(menuName);
		float reviewRate = menuReviewService.averageMenuReview(menuName);

		Map<String, Object> response = Map.of(
				"menuName", menuName,
				"likedByMe", likedByMe,
				"likeCount", likeCount,
				"reviewCount", reviewCount,
				"reviewRate", reviewRate
		);
		System.out.println(
				response.get("menuName").toString() + ", " +
						response.get("likedByMe").toString() + ", " +
						response.get("likeCount").toString() + ", " +
						response.get("reviewCount").toString() + ", " +
						response.get("reviewRate").toString()
		);
		return ResponseEntity.ok(response);
	}

//	@GetMapping("/findMenuReview")
//	@ResponseBody
//	public String findMenuReview(@DateTimeFormat(pattern = "yyyy-MM-dd")
//							   @RequestParam("menuDate") Date menuDate) {
//		String str = indexService.findMenuNameByMenuDate(menuDate);
//		log.info(str);
//		return str;
//	}
}
