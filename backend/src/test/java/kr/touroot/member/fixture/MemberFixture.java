package kr.touroot.member.fixture;

import kr.touroot.member.domain.LoginType;
import kr.touroot.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberFixture {


    KAKAO_MEMBER(1L, 1L, "email@gmail.com", "password", "https://dev.touroot.kr/temporary/profile.png", "리비",
            LoginType.KAKAO),
    DEFAULT_MEMBER(2L, null, "email@gmail.com", "password", "https://dev.touroot.kr/temporary/profile.png", "뚜리",
            LoginType.DEFAULT),
    ;

    private final Long id;
    private final Long socialId;
    private final String email;
    private final String password;
    private final String profileImageUrl;
    private final String nickname;
    private final LoginType loginType;

    public Member build() {
        return new Member(id, socialId, email, password, nickname, profileImageUrl, loginType);
    }

}
