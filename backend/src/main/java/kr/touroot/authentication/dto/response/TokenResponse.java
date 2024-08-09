package kr.touroot.authentication.dto.response;

public record TokenResponse(String accessToken, String refreshToken) {
}
