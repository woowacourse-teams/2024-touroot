package woowacourse.touroot.authentication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record KakaoAccountResponse(
        @JsonProperty("profile") KakaoProfileResponse kakaoProfile
) {

    public String nickName() {
        return kakaoProfile().nickname();
    }

    public String profileImage() {
        return kakaoProfile().image();
    }
}
