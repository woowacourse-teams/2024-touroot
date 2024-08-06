package kr.touroot.authentication.fixture;

import kr.touroot.member.domain.LoginType;
import kr.touroot.member.domain.Member;

public class MemberFixture {

    public static final Member MEMBER_KAKAO = new Member(1L, "리비", "http://imageurl.com", LoginType.KAKAO);
    public static final Member MEMBER_DEFAULT = new Member(
            "user@email.com",
            "5304d46adc6ccffd0abf352f3e17ba8b807dc3d5e5d12609d0825d7287",
            "뚜리",
            "http://imageurl.com",
            LoginType.DEFAULT
    );
}
