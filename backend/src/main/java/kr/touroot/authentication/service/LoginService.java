package kr.touroot.authentication.service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import kr.touroot.authentication.dto.request.LoginRequest;
import kr.touroot.authentication.dto.request.TokenReissueRequest;
import kr.touroot.authentication.dto.response.LoginResponse;
import kr.touroot.authentication.dto.response.OauthUserInformationResponse;
import kr.touroot.authentication.infrastructure.JwtTokenProvider;
import kr.touroot.authentication.infrastructure.KakaoOauthProvider;
import kr.touroot.authentication.infrastructure.PasswordEncryptor;
import kr.touroot.global.exception.BadRequestException;
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
    private final PasswordEncryptor passwordEncryptor;

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

    public LoginResponse login(LoginRequest request) {
        String encryptPassword = passwordEncryptor.encrypt(request.password());
        Member member = memberRepository.findByEmailAndPassword(request.email(), encryptPassword)
                .orElseThrow(() -> new BadRequestException("잘못된 이메일 또는 비밀번호입니다."));

        return LoginResponse.of(member, tokenProvider.createToken(member.getId()));
    }

    public LoginResponse reissueToken(TokenReissueRequest request) {
        String memberId = tokenProvider.decodeRefreshToken(request.refreshToken());
        Member member = memberRepository.findById(Long.valueOf(memberId))
                .orElseThrow(() -> new BadRequestException("존재하지 않는 사용자입니다."));

        return LoginResponse.of(member, tokenProvider.createToken(member.getId()));
    }
}
