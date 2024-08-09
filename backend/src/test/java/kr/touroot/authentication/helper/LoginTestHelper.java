package kr.touroot.authentication.helper;

import kr.touroot.authentication.fixture.MemberFixture;
import kr.touroot.member.domain.Member;
import kr.touroot.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class LoginTestHelper {

    private final MemberRepository memberRepository;

    public Member initMemberTestData() {
        Member member = MemberFixture.MEMBER_DEFAULT.getMember();
        return memberRepository.save(member);
    }
}
