package kr.touroot.authentication.infrastructure;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import kr.touroot.authentication.dto.response.OauthUserInformationResponse;

@RequiredArgsConstructor
@Component
public class KakaoOauthProvider {

    private final KakaoOauthClient kakaoOauthClient;

    public OauthUserInformationResponse getUserInformation(String authorizationCode) {
        return kakaoOauthClient.requestUserInformation(authorizationCode);
    }
}
