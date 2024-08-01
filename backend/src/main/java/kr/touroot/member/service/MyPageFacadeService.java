package kr.touroot.member.service;

import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.member.domain.Member;
import kr.touroot.member.dto.ProfileReadResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MyPageFacadeService {

    private final MemberService memberService;

    public ProfileReadResponse readProfile(MemberAuth memberAuth) {
        Member member = memberService.getById(memberAuth.memberId());
        return ProfileReadResponse.from(member);
    }
}
