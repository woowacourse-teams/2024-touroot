package woowacourse.touroot.authentication.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import woowacourse.touroot.authentication.dto.response.LoginResponse;
import woowacourse.touroot.authentication.dto.response.OauthUserInformationResponse;
import woowacourse.touroot.authentication.infrastructure.JwtTokenProvider;
import woowacourse.touroot.authentication.infrastructure.KakaoOauthProvider;
import woowacourse.touroot.member.domain.Member;
import woowacourse.touroot.member.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final MemberRepository memberRepository;
    private final KakaoOauthProvider oauthProvider;
    private final JwtTokenProvider tokenProvider;

    public LoginResponse login(String code) {
        OauthUserInformationResponse userInformation = oauthProvider.getUserInformation(code);
        Member member = memberRepository.findByKakaoId(userInformation.socialLoginId())
                .orElseGet(() -> signUp(userInformation));

        return LoginResponse.of(member, tokenProvider.createToken(member.getId()));
    }

    private Member signUp(OauthUserInformationResponse userInformation) {
        return memberRepository.save(
                new Member(userInformation.socialLoginId(), userInformation.nickname(), userInformation.profileImage())
        );
    }
}
