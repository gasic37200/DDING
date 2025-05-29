package com.printf.DDING.repository;

import com.printf.DDING.entity.MenuReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuReviewRepository extends JpaRepository<MenuReview, Integer> {
	@Query("SELECT count(*) FROM MenuReview mr WHERE mr.menuName = :menuName")
	int countMenuReviewsByMenuName(String menuName);

	@Query("SELECT avg(mr.reviewRate) FROM MenuReview mr WHERE mr.menuName = :menuName")
	Float averageMenuReviewsByMenuName(String menuName);
}
