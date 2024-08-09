package kr.touroot.authentication.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record TokenReissueRequest(
        @Schema(description = "로그인 시 발급받은 리프레시 토큰")
        @NotBlank(message = "리프레시 토큰은 비어있을 수 없습니다.") String refreshToken
) {
}
