package com.printf.DDING.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "menu_review_tb")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuReview {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reviewNo;

	@Column(nullable = false)
	private String menuName;

	@Column(nullable = false, length = 1000)
	private String reviewContent;

	@Column(nullable = false)
	private int reviewRate;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	// FK: member
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_no")
	private Member member;
}