package com.printf.DDING.member.dto;

import lombok.*;

@Getter
@AllArgsConstructor
public class LoginResponse {
	private boolean success;
	private String memberName;
	private String token;
}


