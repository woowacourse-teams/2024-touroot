package kr.touroot.member.fixture;

import kr.touroot.member.dto.request.MemberRequest;

public class MemberRequestFixture {

    private static final String EMAIL = "user@email.com";
    private static final String PASSWORD = "@testpassword";
    private static final String NICKNAME = "뚜리";
    private static final String PROFILE_IMAGE_URL = "https://dev.touroot.kr/images/f8c26e9f-5a9f-42ae-84f1-d507fd9020c1.png";

    private MemberRequestFixture() {
    }

    public static MemberRequest getMemberRequest() {
        return new MemberRequest(EMAIL, PASSWORD, NICKNAME, PROFILE_IMAGE_URL);
    }

    public static MemberRequest getMemberRequestWithEmptyEmail() {
        return new MemberRequest("", PASSWORD, NICKNAME, PROFILE_IMAGE_URL);
    }

    public static MemberRequest getMemberRequestWithEmptyPassword() {
        return new MemberRequest(EMAIL, "", NICKNAME, PROFILE_IMAGE_URL);
    }

    public static MemberRequest getMemberRequestWithEmptyNickname() {
        return new MemberRequest(EMAIL, PASSWORD, "", PROFILE_IMAGE_URL);
    }

    public static MemberRequest getMemberRequestWithEmptyProfileImageUrl() {
        return new MemberRequest(EMAIL, PASSWORD, NICKNAME, "");
    }

    public static MemberRequest getMemberRequestDuplicateEmail() {
        return new MemberRequest(EMAIL, PASSWORD, "뚜리뚜리", PROFILE_IMAGE_URL);
    }

    public static MemberRequest getMemberRequestDuplicateNickname() {
        return new MemberRequest("useruser@email.com", PASSWORD, NICKNAME, PROFILE_IMAGE_URL);
    }
}
