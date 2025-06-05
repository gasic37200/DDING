package com.printf.DDING.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MenuReviewRequest {
	private String menuName;
	private String reviewContent;
	private int reviewRate;
}