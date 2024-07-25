package woowacourse.touroot.authentication.fixture;

import woowacourse.touroot.authentication.dto.response.OauthUserInformationResponse;
import woowacourse.touroot.authentication.dto.response.kakao.KakaoAccount;
import woowacourse.touroot.authentication.dto.response.kakao.KakaoProfile;

public class OauthUserInformationFixture {

    public static final OauthUserInformationResponse USER_1_OAUTH_INFORMATION = new OauthUserInformationResponse(
            1L, new KakaoAccount(new KakaoProfile("리비", "img-url"))
    );
}
