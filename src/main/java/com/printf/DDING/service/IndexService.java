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


}
