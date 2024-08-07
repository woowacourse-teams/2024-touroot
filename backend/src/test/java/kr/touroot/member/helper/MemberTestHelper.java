package kr.touroot.member.helper;

import static kr.touroot.authentication.fixture.MemberFixture.MEMBER_DEFAULT;

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
        Member member = MEMBER_DEFAULT.getMember();

        return memberRepository.save(member);
    }
}
