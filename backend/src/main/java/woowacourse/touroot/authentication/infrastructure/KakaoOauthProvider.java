package woowacourse.touroot.authentication.infrastructure;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import woowacourse.touroot.authentication.dto.OauthUserInformationResponse;

@RequiredArgsConstructor
@Component
public class KakaoOauthProvider {

    private final KakaoOauthClient kakaoOauthClient;

    public OauthUserInformationResponse getUserInformation(String authorizationCode) {
        return kakaoOauthClient.requestUserInformation(authorizationCode);
    }
}
