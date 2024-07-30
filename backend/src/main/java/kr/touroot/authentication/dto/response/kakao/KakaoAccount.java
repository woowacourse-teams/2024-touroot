package kr.touroot.authentication.dto.response.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;

public record KakaoAccount(@JsonProperty("profile") KakaoProfile kakaoProfile) {
}
