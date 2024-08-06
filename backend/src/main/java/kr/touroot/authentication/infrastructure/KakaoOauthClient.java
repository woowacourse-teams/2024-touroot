package kr.touroot.authentication.infrastructure;

import java.io.IOException;
import java.time.Duration;
import kr.touroot.authentication.dto.response.OauthUserInformationResponse;
import kr.touroot.authentication.dto.response.kakao.KakaoAccessTokenResponse;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ClientException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.ClientHttpRequestFactories;
import org.springframework.boot.web.client.ClientHttpRequestFactorySettings;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@Component
public class KakaoOauthClient {

    private final String userInformationRequestUri;
    private final String accessTokenRequestUri;
    private final String restApiKey;
    private final RestClient restClient;

    public KakaoOauthClient(
            @Value("${oauth.kakao.user-information-request-uri}") String userInformationRequestUri,
            @Value("${oauth.kakao.access-token-request-uri}") String accessTokenRequestUri,
            @Value("${oauth.kakao.rest-api-key}") String restApiKey
    ) {
        this.userInformationRequestUri = userInformationRequestUri;
        this.accessTokenRequestUri = accessTokenRequestUri;
        this.restApiKey = restApiKey;
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

    public OauthUserInformationResponse requestUserInformation(String authorizationCode, String redirectUri) {
        KakaoAccessTokenResponse kakaoAccessTokenResponse = requestAccessToken(authorizationCode, redirectUri);

        return restClient.get()
                .uri(userInformationRequestUri)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + kakaoAccessTokenResponse.accessToken())
                .retrieve()
                .onStatus(HttpStatusCode::isError, this::handleClientError)
                .toEntity(OauthUserInformationResponse.class)
                .getBody();
    }

    private KakaoAccessTokenResponse requestAccessToken(String authorizationCode, String redirectUri) {
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
                .onStatus(HttpStatusCode::isError, this::handleClientError)
                .toEntity(KakaoAccessTokenResponse.class)
                .getBody();
    }

    private void handleClientError(HttpRequest request, ClientHttpResponse response) throws IOException {
        if (response.getStatusCode().is4xxClientError()) {
            throw new BadRequestException("잘못된 로그인 요청입니다. 인가코드를 확인해주세요");
        }
        throw new ClientException("외부 서비스의 장애로 카카오로그인을 이용할 수 없습니다");
    }
}
