package kr.touroot.authentication.fixture;

import kr.touroot.member.domain.LoginType;
import kr.touroot.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberFixture {

    MEMBER_KAKAO(new Member(1L, "리비", "http://imageurl.com", LoginType.KAKAO)),
    MEMBER_DEFAULT(new Member("user@email.com", "5304d46adc6ccffd0", "뚜리", "http://imageurl.com", LoginType.DEFAULT));

    private final Member member;
}
