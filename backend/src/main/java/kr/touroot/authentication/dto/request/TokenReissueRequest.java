package kr.touroot.authentication.dto.request;

import jakarta.validation.constraints.NotBlank;

public record TokenReissueRequest(@NotBlank(message = "리프레시 토큰은 비어있을 수 없습니다.") String refreshToken) {
}
