package woowacourse.touroot.authentication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record OauthUserInformationResponse(
        @JsonProperty("id")
        Long socialLoginId,
        @JsonProperty("kakao_account")
        KakaoAccount kakaoAccount
) {

    public String nickname() {
        return kakaoAccount.kakaoProfile.nickname;
    }

    public String profileImage() {
        return kakaoAccount.kakaoProfile.image;
    }

    private record KakaoAccount(
            @JsonProperty("profile") KakaoProfile kakaoProfile
    ) {
    }

    private record KakaoProfile(
            @JsonProperty("nickname") String nickname,
            @JsonProperty("profile_image_url") String image
    ) {
    }
}
