package com.printf.DDING.service;

import com.printf.DDING.entity.Member;
import com.printf.DDING.repository.IndexRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class IndexService {
	private final IndexRepository indexRepository;

	public String findMenuName(Date menuDate) {
		return indexRepository.findMenuNameByMenuDate(menuDate);
	}

	public int countMenuLike(String menuName) {
		return indexRepository.countMenuLikesByMenuName(menuName);
	}

	public boolean isMenuLiked(int memberNo, String menuName) {
		return indexRepository.countMenuLikeByMember(memberNo, menuName) > 0;
	}

	public int countMenuReview(String menuName) {
		return indexRepository.countMenuReviewsByMenuName(menuName);
	}
}
