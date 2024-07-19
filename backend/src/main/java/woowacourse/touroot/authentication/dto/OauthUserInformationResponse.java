package woowacourse.touroot.authentication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record OauthUserInformationResponse(
        @JsonProperty("id")
        Long socialLoginId,
        @JsonProperty("kakao_account")
        KakaoAccountResponse kakaoAccount
) {

    public String nickname() {
        return kakaoAccount.nickName();
    }

    public String profileImage() {
        return kakaoAccount.profileImage();
    }

}
