package kr.touroot.authentication.service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import kr.touroot.authentication.dto.response.LoginResponse;
import kr.touroot.authentication.dto.response.OauthUserInformationResponse;
import kr.touroot.authentication.infrastructure.JwtTokenProvider;
import kr.touroot.authentication.infrastructure.KakaoOauthProvider;
import kr.touroot.member.domain.Member;
import kr.touroot.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final MemberRepository memberRepository;
    private final KakaoOauthProvider oauthProvider;
    private final JwtTokenProvider tokenProvider;

    public LoginResponse login(String code, String encodedRedirectUri) {
        String redirectUri = URLDecoder.decode(encodedRedirectUri, StandardCharsets.UTF_8);
        OauthUserInformationResponse userInformation = oauthProvider.getUserInformation(code, redirectUri);
        Member member = memberRepository.findByKakaoId(userInformation.socialLoginId())
                .orElseGet(() -> signUp(userInformation));

        return LoginResponse.of(member, tokenProvider.createToken(member.getId()));
    }

    private Member signUp(OauthUserInformationResponse userInformation) {
        return memberRepository.save(userInformation.toMember());
    }
}
