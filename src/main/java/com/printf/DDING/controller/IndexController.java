package com.printf.DDING.controller;

import com.printf.DDING.service.IndexService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.util.Date;

@Slf4j
@Controller
@RequiredArgsConstructor
public class IndexController {
	public final IndexService indexService;

	@GetMapping("/")
	public String index() {
		return "index";
	}

	@GetMapping("/findMenu")
	@ResponseBody
	public String findMenuName(@DateTimeFormat(pattern = "yyyy-MM-dd")
							   @RequestParam("menuDate") Date menuDate) {
		String str = indexService.findMenuNameByMenuDate(menuDate);
		log.info(str);
		return str;
	}
}
