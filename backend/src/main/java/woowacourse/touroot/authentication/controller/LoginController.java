package woowacourse.touroot.authentication.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import woowacourse.touroot.authentication.service.LoginService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/login")
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/oauth/kakao")
    public String login(@RequestParam(name = "code") String authorizationCode) {

        // 얻어온 정보를 기반으로 회원가입 여부 체크
        // 회원가입이 되어 있지 않다면 얻어온 정보로 회원가입 (DB 저장)
        // accessToken 생성 (refreshToken 도입은 나중에 ..ㅎ)
        // accessToken 리턴
        return loginService.login(authorizationCode);
    }
}
