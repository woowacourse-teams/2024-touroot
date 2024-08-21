package kr.touroot.authentication.infrastructure;

import kr.touroot.authentication.dto.response.OauthUserInformationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class KakaoOauthProvider {

    private final KakaoOauthClient kakaoOauthClient;

    public OauthUserInformationResponse getUserInformation(String authorizationCode, String redirectUri) {
        return kakaoOauthClient.requestUserInformation(authorizationCode, redirectUri);
    }
}
