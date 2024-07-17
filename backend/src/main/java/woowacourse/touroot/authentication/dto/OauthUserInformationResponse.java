package woowacourse.touroot.authentication.dto;

import static lombok.AccessLevel.PRIVATE;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;

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

    @NoArgsConstructor(access = PRIVATE)
    private static class KakaoAccount {

        @JsonProperty("profile")
        private KakaoProfile kakaoProfile;
    }

    @NoArgsConstructor(access = PRIVATE)
    private static class KakaoProfile {

        @JsonProperty("nickname")
        private String nickname;

        @JsonProperty("profile_image_url")
        private String image;
    }
}
