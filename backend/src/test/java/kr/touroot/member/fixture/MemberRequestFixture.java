package kr.touroot.member.fixture;

import kr.touroot.member.dto.request.MemberRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberRequestFixture {

    VALID_MEMBER(
            new MemberRequest("user@email.com", "@testpassword", "뚜리", "https://dev.touroot.kr/images/f8c26e9f.png")
    ),
    EMPTY_EMAIL_MEMBER(
            new MemberRequest("", "@testpassword", "뚜리", "https://dev.touroot.kr/images/f8c26e9f.png")
    ),
    EMPTY_PASSWORD_MEMBER(
            new MemberRequest("user@email.com", "", "뚜리", "https://dev.touroot.kr/images/f8c26e9f.png")
    ),
    EMPTY_NICKNAME_MEMBER(
            new MemberRequest("user@email.com", "@testpassword", "", "https://dev.touroot.kr/images/f8c26e9f.png")
    ),
    EMPTY_PROFILE_IMAGE_URL_MEMBER(
            new MemberRequest("user@email.com", "@testpassword", "뚜리", "")
    ),
    DUPLICATE_EMAIL_MEMBER(
            new MemberRequest("user@email.com", "@testpassword", "뚜리뚜리", "https://dev.touroot.kr/images/f8c26e9f.png")
    ),
    DUPLICATE_NICKNAME_MEMBER(
            new MemberRequest("hello@email.com", "@testpassword", "뚜리", "https://dev.touroot.kr/images/f8c26e9f.png")
    );

    private final MemberRequest request;
}
