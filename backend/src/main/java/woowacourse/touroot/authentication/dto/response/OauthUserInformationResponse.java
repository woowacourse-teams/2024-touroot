package woowacourse.touroot.authentication.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import woowacourse.touroot.authentication.dto.response.kakao.KakaoAccount;
import woowacourse.touroot.member.domain.Member;

public record OauthUserInformationResponse(
        @JsonProperty("id")
        Long socialLoginId,
        @JsonProperty("kakao_account")
        KakaoAccount kakaoAccount
) {

    public Member toMember() {
        return new Member(socialLoginId, nickname(), profileImage());
    }

    public String nickname() {
        return kakaoAccount.kakaoProfile().nickname();
    }

    public String profileImage() {
        return kakaoAccount.kakaoProfile().image();
    }

}
