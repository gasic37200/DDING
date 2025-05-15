package com.printf.DDING.board.controller;

import com.printf.DDING.board.dto.BoardDTO;
import com.printf.DDING.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor // DI(의존성 주입) 자동 / 생성자 자동 주입
public class BoardController {
	private final BoardService boardService;

	@GetMapping("/list")
	public String list(Model model) {
		List<BoardDTO> boardDTOList = boardService.listUp();
		model.addAttribute("boardDTOList", boardDTOList); // list 페이지에 할당
		return "board-list";
	}

	@GetMapping("/save")
	public String save() {
		return "save";
	}
}
