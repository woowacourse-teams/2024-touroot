package kr.touroot.authentication.helper;

import kr.touroot.member.domain.Member;
import kr.touroot.member.fixture.MemberFixture;
import kr.touroot.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class LoginTestHelper {

    private final MemberRepository memberRepository;

    public Member initMemberTestData() {
        Member member = MemberFixture.DEFAULT_MEMBER.build();
        return memberRepository.save(member);
    }
}
