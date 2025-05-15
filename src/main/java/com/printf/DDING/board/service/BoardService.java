package com.printf.DDING.board.service;

import com.printf.DDING.board.dto.BoardDTO;
import com.printf.DDING.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {
	private final BoardRepository boardRepository;

	public List<BoardDTO> listUp() {
		return boardRepository.listUp();
	}
}
