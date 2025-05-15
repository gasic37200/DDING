package com.printf.DDING.board.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class BoardDTO {
	private long boardId;
	private String boardTitle;
	private String boardContent;
	private int boardPass;
	private int createdBy;
	private Date createdDate;
	private int boardHits;
	private String boardImage;
	private int imageAttached;

}
