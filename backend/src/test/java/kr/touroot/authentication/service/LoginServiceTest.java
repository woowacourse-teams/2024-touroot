package kr.touroot.authentication.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import kr.touroot.authentication.dto.response.LoginResponse;
import kr.touroot.authentication.fixture.OauthUserFixture;
import kr.touroot.authentication.infrastructure.KakaoOauthProvider;
import kr.touroot.global.AbstractServiceIntegrationTest;
import kr.touroot.member.domain.Member;
import kr.touroot.member.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

@DisplayName("로그인 서비스")
class LoginServiceTest extends AbstractServiceIntegrationTest {

    private static final String AUTHENTICATION_CODE = "test-authentication-code";
    private static final String REDIRECT_URI = "http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fv1%2Flogin%2Foauth%2Fkakao";

    @Autowired
    private LoginService loginService;
    @Autowired
    private MemberRepository memberRepository;
    @MockBean
    private KakaoOauthProvider oauthProvider;

    @DisplayName("투룻 회원가입이 되어 있는 회원의 카카오 소셜 로그인을 처리할 수 있다")
    @Test
    void existUserKakaoSocialLoginTest() {
        // given
        OauthUserFixture kakaoUser = OauthUserFixture.KAKAO_USER;
        Member preSignedUpUser = loginService.signUp(kakaoUser.getOauthInformationResponse());
        when(oauthProvider.getUserInformation(any(String.class), any(String.class)))
                .thenReturn(kakaoUser.getOauthInformationResponse());

        // when
        LoginResponse response = loginService.login(AUTHENTICATION_CODE, REDIRECT_URI);

        // then
        assertThat(response.memberId()).isEqualTo(preSignedUpUser.getId());
    }

    @DisplayName("투룻 회원가입이 되어 있지 않은 회원은 소셜 로그인 과정에서 회원가입 후 로그인 된다")
    @Test
    void nonExistUserKakaoSocialLoginTest() {
        // given
        when(oauthProvider.getUserInformation(any(String.class), any(String.class)))
                .thenReturn(OauthUserFixture.KAKAO_USER.getOauthInformationResponse());

        // when
        LoginResponse response = loginService.login(AUTHENTICATION_CODE, REDIRECT_URI);

        // then
        assertThat(response.memberId()).isNotNull();
    }
}
