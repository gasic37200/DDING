package com.printf.DDING.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "menu_tb") // 테이블 이름 명시
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Menu {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int menuNo;
	private String menuName;   // 예: "김치찌개 돈까스"
	private Date menuDate;   // 예: "2025-05-20"
}