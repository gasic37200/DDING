package com.printf.DDING.service;

import com.printf.DDING.entity.Member;
import com.printf.DDING.entity.MenuReview;
import com.printf.DDING.repository.MenuReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuReviewService {
	private final MenuReviewRepository menuReviewRepository;

	public int countMenuReview(String menuName) {
		return menuReviewRepository.countMenuReviewsByMenuName(menuName);
	}

	public Float averageMenuReview(String menuName) {
		Float avg = menuReviewRepository.averageMenuReviewsByMenuName(menuName);
		return avg == null ? 0 : avg;
	}

	public List<MenuReview> getReviews(String menuName) {
		return menuReviewRepository.findByMenuName(menuName);
	}

	public void saveReview(Member member, String menuName, String reviewContent, int reviewRate) {
		menuReviewRepository.save(new MenuReview(member, menuName, reviewContent, reviewRate));
	}
}
