package com.printf.DDING.repository;

import com.printf.DDING.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface IndexRepository extends JpaRepository<Menu,Integer> {
	@Query("SELECT m.menuName FROM Menu m WHERE m.menuDate = :menuDate")
	String findMenuNameByMenuDate(Date menuDate);

	@Query("SELECT count(*) FROM MenuLike ml WHERE ml.menuName = :menuName")
	int countMenuLikesByMenuName(String menuName);

	@Query("SELECT count(*) FROM MenuLike ml where ml.member.memberNo = :memberNo and ml.menuName = :menuName")
	int countMenuLikeByMember(int memberNo, String menuName);

	@Query("SELECT count(*) FROM MenuReview mr WHERE mr.menuName = :menuName")
	int countMenuReviewsByMenuName(String menuName);
}
