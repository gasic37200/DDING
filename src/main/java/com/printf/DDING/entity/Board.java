package com.printf.DDING.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "board_tb")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Board {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int boardNo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_no", nullable = false)
	private Member member;

	@Column(length = 100, nullable = false)
	private String boardTitle;

	@Column(columnDefinition = "TEXT")
	private String boardContent;

	@Column(length = 20)
	private String boardPass;

	@Column(length = 30)
	private String createdBy;

	private int boardHits = 0;

	private boolean imageAttached = false;

	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	@PrePersist
	public void onCreate() {
		this.createdAt = LocalDateTime.now();
		this.updatedAt = LocalDateTime.now();
	}

	@PreUpdate
	public void onUpdate() {
		this.updatedAt = LocalDateTime.now();
	}
}
