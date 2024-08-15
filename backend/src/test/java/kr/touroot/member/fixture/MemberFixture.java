package kr.touroot.member.fixture;

import kr.touroot.member.domain.LoginType;
import kr.touroot.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberFixture {

    KAKAO_MEMBER(1L, null, null, "https://dev.touroot.kr/temporary/profile.png", "리비",
            LoginType.KAKAO),
    DEFAULT_MEMBER(null, "email@gmail.com", "password", "https://dev.touroot.kr/temporary/profile.png", "뚜리",
            LoginType.DEFAULT);

    private final Long socialId;
    private final String email;
    private final String password;
    private final String profileImageUrl;
    private final String nickname;
    private final LoginType loginType;

    public Member build() {
        if (loginType == LoginType.KAKAO) {
            return new Member(socialId, nickname, profileImageUrl, loginType);
        }
        return new Member(email, password, nickname, profileImageUrl, loginType);
    }
}
