package kr.touroot.travelogue.fixture;


import kr.touroot.member.domain.Member;
import kr.touroot.member.fixture.MemberFixture;
import kr.touroot.travelogue.domain.Travelogue;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TravelogueFixture {

    TRAVELOGUE(MemberFixture.KAKAO_MEMBER.build(), "제주에 하영 옵서", "https://dev.touroot.kr/temporary/jeju_thumbnail.png");

    private final Member author;
    private final String title;
    private final String thumbnail;

    public Travelogue get() {
        return new Travelogue(author, title, thumbnail);
    }

    public Travelogue create(Member author) {
        return new Travelogue(author, title, thumbnail);
    }
}
