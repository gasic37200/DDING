package com.printf.DDING.member.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginRequest {
	private String memberInputId;
	private String memberInputPass;
}
