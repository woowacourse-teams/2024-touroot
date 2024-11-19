package kr.touroot.member.fixture;

import kr.touroot.member.domain.LoginType;
import kr.touroot.member.domain.Member;
import kr.touroot.member.dto.request.MemberRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberFixture {

    KAKAO_MEMBER(
            1L,
            null,
            null,
            "https://dev.touroot.kr/temporary/profile.png",
            "리비",
            LoginType.KAKAO
    ),
    DEFAULT_MEMBER(
            null,
            "email@gmail.com",
            "password",
            "https://dev.touroot.kr/temporary/profile.png",
            "뚜리",
            LoginType.DEFAULT
    ),
    ;

    private final Long socialId;
    private final String email;
    private final String password;
    private final String profileImageUrl;
    private final String nickname;
    private final LoginType loginType;

    public Member create() {
        if (loginType == LoginType.KAKAO) {
            return new Member(socialId, nickname, profileImageUrl, loginType);
        }
        return new Member(email, password, nickname, profileImageUrl, loginType);
    }

    public MemberRequest createRequest() {
        return new MemberRequest(email, password, nickname, profileImageUrl);
    }

    public MemberRequest createRequestWithEmail(String email) {
        return new MemberRequest(email, password, nickname, profileImageUrl);
    }

    public MemberRequest createRequestWithPassword(String password) {
        return new MemberRequest(email, password, nickname, profileImageUrl);
    }

    public MemberRequest createRequestWithNickname(String nickname) {
        return new MemberRequest(email, password, nickname, profileImageUrl);
    }

    public MemberRequest createRequestWithProfileImageUrl(String profileImageUrl) {
        return new MemberRequest(email, password, nickname, profileImageUrl);
    }

    public MemberRequest getMemberRequestWithEmailAndNickname(String email, String nickname) {
        return new MemberRequest(email, password, nickname, profileImageUrl);
    }
}
