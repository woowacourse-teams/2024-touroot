package woowacourse.touroot.authentication.infrastructure;

import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.ClientHttpRequestFactories;
import org.springframework.boot.web.client.ClientHttpRequestFactorySettings;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import woowacourse.touroot.authentication.dto.KakaoAccessTokenResponse;
import woowacourse.touroot.authentication.dto.OauthUserInformationResponse;

@Component
public class KakaoOauthClient {

    private final String userInformationRequestUri;
    private final String accessTokenRequestUri;
    private final String restApiKey;
    private final String redirectUri;
    private final RestClient restClient;

    public KakaoOauthClient(
            @Value("${oauth.kakao.user-information-request-uri}") String userInformationRequestUri,
            @Value("${oauth.kakao.access-token-request-uri}") String accessTokenRequestUri,
            @Value("${oauth.kakao.rest-api-key}") String restApiKey,
            @Value("${oauth.kakao.redirect-uri}") String redirectUri
    ) {
        this.userInformationRequestUri = userInformationRequestUri;
        this.accessTokenRequestUri = accessTokenRequestUri;
        this.restApiKey = restApiKey;
        this.redirectUri = redirectUri;
        this.restClient = buildRestClient();
    }

    private RestClient buildRestClient() {
        ClientHttpRequestFactorySettings settings = ClientHttpRequestFactorySettings.DEFAULTS
                .withConnectTimeout(Duration.ofSeconds(1))
                .withReadTimeout(Duration.ofSeconds(3));

        ClientHttpRequestFactory requestFactory = ClientHttpRequestFactories.get(settings);

        return RestClient.builder()
                .requestFactory(requestFactory)
                .build();
    }

    public OauthUserInformationResponse requestUserInformation(String authorizationCode) {
        KakaoAccessTokenResponse kakaoAccessTokenResponse = requestAccessToken(authorizationCode);

        return restClient.get()
                .uri(userInformationRequestUri)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + kakaoAccessTokenResponse.accessToken())
                .retrieve()
                .toEntity(OauthUserInformationResponse.class)
                .getBody();
    }

    private KakaoAccessTokenResponse requestAccessToken(String authorizationCode) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", restApiKey);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        return restClient.post()
                .uri(accessTokenRequestUri)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(params)
                .retrieve()
                .toEntity(KakaoAccessTokenResponse.class)
                .getBody();
    }
}
