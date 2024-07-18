package woowacourse.touroot.authentication.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import woowacourse.touroot.authentication.dto.LoginResponse;
import woowacourse.touroot.authentication.service.LoginService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/login")
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/oauth/kakao")
    public ResponseEntity<LoginResponse> login(@RequestParam(name = "code") String authorizationCode) {
        return ResponseEntity.ok()
                .body(loginService.login(authorizationCode));
    }
}
