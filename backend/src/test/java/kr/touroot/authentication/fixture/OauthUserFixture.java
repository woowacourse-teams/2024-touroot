package kr.touroot.authentication.fixture;

import kr.touroot.authentication.dto.response.OauthUserInformationResponse;
import kr.touroot.authentication.dto.response.kakao.KakaoAccount;
import kr.touroot.authentication.dto.response.kakao.KakaoProfile;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum OauthUserFixture {

    KAKAO_USER(1L, "test_nickname", "https://test_img_src.com");

    private final Long socialLoginId;
    private final String nickname;
    private final String profileImagePath;

    public OauthUserInformationResponse getOauthInformationResponse() {
        KakaoProfile kakaoProfile = new KakaoProfile(nickname, profileImagePath);
        KakaoAccount kakaoAccount = new KakaoAccount(kakaoProfile);
        return new OauthUserInformationResponse(socialLoginId, kakaoAccount);
    }
}
