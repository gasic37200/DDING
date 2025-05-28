package com.printf.DDING.service;

import org.springframework.stereotype.Service;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Service
public class SmsService {

    private final DefaultMessageService messageService;
    
    private final String API_KEY = "NCSLG2D6UCEPLBD0"; // 발급받은 API 키
    private final String API_SECRET = "J99D2WJMKK6NOI5I5CXIGLD95WV2NSQP"; // 쿨SMS 아이디
    private final String SENDER = "010-3160-7685"; // 쿨SMS에 등록된 발신번호

    public SmsService() {
        this.messageService = NurigoApp.INSTANCE.initialize(API_KEY, API_SECRET, "https://api.coolsms.co.kr");
    }

    public String sendSms(String to, String text) {
        try {
            Message message = new Message();
            message.setFrom(SENDER);
            message.setTo(to);
            message.setText(text);

            SingleMessageSendingRequest request = new SingleMessageSendingRequest(message);
            SingleMessageSentResponse response = messageService.sendOne(request);
            return "문자 전송 성공: " + response.getStatusMessage();
        } catch (Exception e) {
            e.printStackTrace();
            return "문자 전송 실패: " + e.getMessage();
        }
    }

}
