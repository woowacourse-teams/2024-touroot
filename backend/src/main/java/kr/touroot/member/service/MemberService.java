package kr.touroot.member.service;

import java.util.Objects;
import kr.touroot.authentication.infrastructure.PasswordEncryptor;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.image.infrastructure.AwsS3Provider;
import kr.touroot.member.domain.Member;
import kr.touroot.member.dto.request.MemberRequest;
import kr.touroot.member.dto.request.ProfileUpdateRequest;
import kr.touroot.member.dto.response.ProfileResponse;
import kr.touroot.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncryptor passwordEncryptor;
    private final AwsS3Provider s3Provider;

    @Transactional(readOnly = true)
    public Member getMemberById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 사용자입니다."));
    }

    @Transactional
    public Long createMember(MemberRequest request) {
        validateRequest(request);
        String encryptedPassword = passwordEncryptor.encrypt(request.password());
        Member member = request.toMember(encryptedPassword);

        return memberRepository.save(member).getId();
    }

    private void validateRequest(MemberRequest request) {
        validateEmailDuplication(request.email());
        validateNicknameDuplication(request.nickname());
    }

    private void validateEmailDuplication(String email) {
        if (memberRepository.findByEmail(email).isPresent()) {
            throw new BadRequestException("이미 회원 가입되어 있는 이메일입니다.");
        }
    }

    private void validateNicknameDuplication(String nickname) {
        if (memberRepository.findByNickname(nickname).isPresent()) {
            throw new BadRequestException("이미 사용 중인 닉네임입니다.");
        }
    }

    @Transactional
    public ProfileResponse updateProfile(ProfileUpdateRequest request, MemberAuth memberAuth) {
        Member member = getMemberById(memberAuth.memberId());
        String requestProfileImageUrl = request.profileImageUrl();
        if (isUpdatable(requestProfileImageUrl, member)) {
            requestProfileImageUrl = s3Provider.copyImageToPermanentStorage(request.profileImageUrl());
        }
        member.update(request.nickname(), requestProfileImageUrl);

        return ProfileResponse.from(member);
    }

    private boolean isUpdatable(String requestProfileImageUrl, Member member) {
        return !requestProfileImageUrl.isEmpty() && !Objects.equals(requestProfileImageUrl,
                member.getProfileImageUrl());
    }
}
