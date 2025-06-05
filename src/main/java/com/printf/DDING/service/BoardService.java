package com.printf.DDING.service;

import com.printf.DDING.entity.Board;
import com.printf.DDING.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {
	private final BoardRepository boardRepository;

	public List<Board> listUp() {
		return boardRepository.findAll(Sort.by(Sort.Direction.DESC, "createAt"));
	}
}
