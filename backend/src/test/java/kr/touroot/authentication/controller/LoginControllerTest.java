package kr.touroot.authentication.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import kr.touroot.authentication.dto.request.TokenReissueRequest;
import kr.touroot.authentication.dto.response.TokenResponse;
import kr.touroot.authentication.fixture.OauthUserInformationFixture;
import kr.touroot.authentication.helper.LoginTestHelper;
import kr.touroot.authentication.infrastructure.JwtTokenProvider;
import kr.touroot.authentication.infrastructure.KakaoOauthProvider;
import kr.touroot.global.AcceptanceTest;
import kr.touroot.member.domain.Member;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.server.LocalServerPort;

@AcceptanceTest
class LoginControllerTest {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private DatabaseCleaner databaseCleaner;
    @Autowired
    private LoginTestHelper testHelper;
    @MockBean
    private KakaoOauthProvider oauthProvider;
    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        databaseCleaner.executeTruncate();
    }

    @DisplayName("카카오 로그인 요청을 처리할 수 있다")
    @Test
    void loginTest() throws Exception {
        when(oauthProvider.getUserInformation(any(String.class), any(String.class)))
                .thenReturn(OauthUserInformationFixture.USER_1_OAUTH_INFORMATION);

        RestAssured.given().log().all()
                .queryParam("code", "test")
                .queryParam("redirectUri", "https://test")
                .when().log().all()
                .post("/api/v1/login/oauth/kakao")
                .then().log().all()
                .statusCode(200)
                .body("memberId", is(1));
    }

    @DisplayName("리프레시 토큰으로 재로그인을 할 수 있다.")
    @Test
    void reissueToken() {
        // given
        Member member = testHelper.initMemberTestData();
        TokenResponse tokenResponse = jwtTokenProvider.createToken(member.getId());
        TokenReissueRequest tokenReissueRequest = new TokenReissueRequest(tokenResponse.refreshToken());

        // when
        String accessToken = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(tokenReissueRequest)
                .when().log().all()
                .post("/api/v1/login/reissue-token")
                .then().log().all()
                .statusCode(200)
                .extract()
                .jsonPath().get("accessToken");
        String actual = jwtTokenProvider.decodeAccessToken(accessToken);

        // then
        assertThat(actual).isEqualTo("1");
    }
}
