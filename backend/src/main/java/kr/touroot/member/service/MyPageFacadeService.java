package kr.touroot.member.service;

import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.member.domain.Member;
import kr.touroot.member.dto.MyTraveloguesResponse;
import kr.touroot.member.dto.ProfileReadResponse;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.service.TravelogueService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MyPageFacadeService {

    private final MemberService memberService;
    private final TravelogueService travelogueService;

    public ProfileReadResponse readProfile(MemberAuth memberAuth) {
        Member member = memberService.getById(memberAuth.memberId());
        return ProfileReadResponse.from(member);
    }

    public Page<MyTraveloguesResponse> readTravelogues(MemberAuth memberAuth, Pageable pageable) {
        Member member = memberService.getById(memberAuth.memberId());
        Page<Travelogue> travelogues = travelogueService.findAllByMember(member, pageable);

        return travelogues.map(MyTraveloguesResponse::from);
    }
}
