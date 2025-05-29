package com.printf.DDING.service;

import com.printf.DDING.repository.MenuReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
