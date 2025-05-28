package com.printf.DDING.controller;

import com.printf.DDING.service.SmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sms")
public class SmsController {
    private final SmsService smsService;

    @GetMapping("/test")
    public String sendTestSms(@RequestParam String to) {
        // 아직 크롤링한 데이터를 불러와서 사용자에게 메세지를 보내는 것 X
        //
        return smsService.sendSms(to, "[학식알림] 오늘의 학식은 제육볶음입니다!");
    }
}
