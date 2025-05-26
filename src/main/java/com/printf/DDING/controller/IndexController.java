package com.printf.DDING.controller;

import com.printf.DDING.service.IndexService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.util.Date;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class IndexController {
	public final IndexService indexService;

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

	@GetMapping("/menu/info")
	@ResponseBody
	public ResponseEntity<?> countByMenuLike(@RequestParam(required = false) Integer memberNo,
								@RequestParam("menuName") String menuName) {
		System.out.println("💡 [menu/info] memberNo: " + memberNo + ", menuName: " + menuName);
		boolean likedByMe = memberNo == null ? false : indexService.isMenuLiked(memberNo, menuName);
		System.out.println(likedByMe);
		int likeCount = indexService.countMenuLike(menuName);
		int reviewCount = indexService.countMenuReview(menuName);

		Map<String, Object> response = Map.of(
				"menuName", menuName,
				"likedByMe", likedByMe,
				"likeCount", likeCount,
				"reviewCount", reviewCount
		);
		System.out.println(
				response.get("menuName").toString() + ", " +
						response.get("likedByMe").toString() + ", " +
						response.get("likeCount").toString() + ", " +
						response.get("reviewCount").toString()
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
