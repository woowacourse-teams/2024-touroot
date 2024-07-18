package woowacourse.touroot.authentication.service;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import woowacourse.touroot.authentication.dto.OauthUserInformationResponse;
import woowacourse.touroot.authentication.infrastructure.KakaoOauthProvider;
import woowacourse.touroot.member.domain.Member;
import woowacourse.touroot.member.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final MemberRepository memberRepository;
    private final KakaoOauthProvider oauthProvider;

    public String login(String code) {
        OauthUserInformationResponse userInformation = oauthProvider.getUserInformation(code);
        Member member = memberRepository.findByKakaoId(userInformation.socialLoginId())
                .orElseGet(() -> signUp(userInformation));

        return userInformation.profileImage();
    }

    private Member signUp(OauthUserInformationResponse userInformation) {
        return memberRepository.save(
                new Member(userInformation.socialLoginId(), userInformation.nickname(), userInformation.profileImage())
        );
    }
}
