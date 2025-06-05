package com.printf.DDING.controller;

import com.printf.DDING.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor // DI(의존성 주입) 자동 / 생성자 자동 주입
public class BoardController {
	private final BoardService boardService;

	@GetMapping("/board")
	public String board(Model model) {
		return "board";
	}

	@GetMapping("/list")
	public String list() {
		return "board-list";
	}

	@GetMapping("/save")
	public String save() {
		return "save";
	}
}
