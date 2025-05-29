package com.printf.DDING.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "menu_like_tb", uniqueConstraints = {
		@UniqueConstraint(columnNames = {"member_no", "menuName"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuLike {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int likeNo;

	@Column(nullable = false)
	private String menuName;

	@Column(nullable = false)
	private LocalDateTime likedAt;

	// FK: member
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_no")
	private Member member;

	public MenuLike(Member member, String menuName) {
		this.member = member;
		this.menuName = menuName;
	}

	@PrePersist
	public void prePersist() {
		this.likedAt = LocalDateTime.now();
	}
}