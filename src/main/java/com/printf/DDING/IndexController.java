package com.printf.DDING;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class IndexController {
	@GetMapping("/")
	public String index() {
		return "index";
	}

//	@GetMapping("/board")
//	public String board() {
//		log.info("board메서드 call");
//		return "board";
//	}
}
