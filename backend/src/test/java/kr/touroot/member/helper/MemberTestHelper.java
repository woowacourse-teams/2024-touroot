package kr.touroot.member.helper;

import static kr.touroot.member.fixture.MemberFixture.DEFAULT_MEMBER;

import kr.touroot.member.domain.Member;
import kr.touroot.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MemberTestHelper {

    private final MemberRepository memberRepository;

    @Autowired
    public MemberTestHelper(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member persistMember() {
        Member member = DEFAULT_MEMBER.build();
        return memberRepository.save(member);
    }

    public Member persistMember(Member member) {
        return memberRepository.save(member);
    }
}
