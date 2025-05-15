package com.printf.DDING.board.repository;

import com.printf.DDING.board.dto.BoardDTO;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BoardRepository {
	private final SqlSessionTemplate sql;

	public List<BoardDTO> listUp() {
		return sql.selectList("BoardMapper.listUp"); // namespace는 DDING, id는 ListUp
	}
}
