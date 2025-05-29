package com.printf.DDING.scheuler;


import com.printf.DDING.entity.Member;
import com.printf.DDING.service.SmsService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Component
public class MealScheduler {

    private final SmsService smsService;

    public MealScheduler(SmsService smsService) {
        this.smsService = smsService;
    }

    // 매일 오전 09시 00분에 자동 실행됨
    @Scheduled(cron = "0 00 09 * * *")
    public void sendMealMenu() {
        DayOfWeek dayOfWeek = LocalDate.now().getDayOfWeek();

        List<Member> mebers;

        String menu = "오늘의 학식은 제육볶음입니다! 🍱";
        String to = "01031607685";  // 예시 수신자 번호

        smsService.sendSms(to, "[학식알림] " + menu);
        System.out.println("✅ 학식 문자 자동 발송 완료");
    }
}

