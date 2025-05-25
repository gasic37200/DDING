import com.printf.DDING.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "review_tb")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuReview {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reviewNo;

	@Column(nullable = false)
	private String menuName;

	@Column(nullable = false, length = 1000)
	private String reviewContent;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	// FK: member
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_no")
	private Member member;
}