package woowacourse.touroot.authentication.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import woowacourse.touroot.authentication.dto.LoginResponse;
import woowacourse.touroot.authentication.service.LoginService;
import woowacourse.touroot.global.exception.dto.ExceptionResponse;

@Tag(name = "로그인")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/login")
public class LoginController {

    private final LoginService loginService;

    @Operation(
            summary = "카카오 로그인",
            responses = {
                    @ApiResponse(
                            responseCode = "400",
                            description = "유효하지 않은 인가 코드로 로그인 요청을 했을 때",
                            content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
                    )
            }
    )
    @GetMapping("/oauth/kakao")
    public ResponseEntity<LoginResponse> login(@RequestParam(name = "code") String authorizationCode) {
        return ResponseEntity.ok()
                .body(loginService.login(authorizationCode));
    }
}
