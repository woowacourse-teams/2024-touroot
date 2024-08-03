package kr.touroot.authentication.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import kr.touroot.authentication.dto.response.LoginResponse;
import kr.touroot.authentication.fixture.MemberFixture;
import kr.touroot.authentication.fixture.OauthUserInformationFixture;
import kr.touroot.authentication.infrastructure.JwtTokenProvider;
import kr.touroot.authentication.infrastructure.KakaoOauthProvider;
import kr.touroot.member.domain.Member;
import kr.touroot.member.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@DisplayName("로그인 서비스")
@ExtendWith(MockitoExtension.class)
class LoginServiceTest {

    private static final String AUTHENTICATION_CODE = "test-authentication-code";
    private static final String REDIRECT_URI = "http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fv1%2Flogin%2Foauth%2Fkakao";

    @InjectMocks
    private LoginService loginService;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private KakaoOauthProvider kakaoOauthProvider;
    @Mock
    JwtTokenProvider jwtTokenProvider;

    @DisplayName("투룻 회원가입이 되어 있는 회원의 카카오 소셜 로그인을 처리할 수 있다")
    @Test
    void existUserKakaoSocialLoginTest() {
        // given
        when(kakaoOauthProvider.getUserInformation(any(String.class), any(String.class)))
                .thenReturn(OauthUserInformationFixture.USER_1_OAUTH_INFORMATION);
        when(memberRepository.findByKakaoId(any(Long.class)))
                .thenReturn(Optional.of(MemberFixture.MEMBER_1));
        LoginResponse response = loginService.login(AUTHENTICATION_CODE, REDIRECT_URI);

        // when & then
        assertThat(response).isEqualTo(
                LoginResponse.of(MemberFixture.MEMBER_1, response.accessToken()));
    }

    @DisplayName("투룻 회원가입이 되어 있지 않은 회원은 소셜 로그인 과정에서 회원가입 후 로그인 된다")
    @Test
    void nonExistUserKakaoSocialLoginTest() {
        // given
        when(kakaoOauthProvider.getUserInformation(any(String.class), any(String.class)))
                .thenReturn(OauthUserInformationFixture.USER_1_OAUTH_INFORMATION);
        when(memberRepository.findByKakaoId(any(Long.class)))
                .thenReturn(Optional.empty());
        when(memberRepository.save(any(Member.class)))
                .thenReturn(MemberFixture.MEMBER_1);
        LoginResponse response = loginService.login(AUTHENTICATION_CODE, REDIRECT_URI);

        // when & then
        assertThat(response).isEqualTo(
                LoginResponse.of(MemberFixture.MEMBER_1, response.accessToken()));
        verify(memberRepository, times(1)).save(any(Member.class));
    }
}
