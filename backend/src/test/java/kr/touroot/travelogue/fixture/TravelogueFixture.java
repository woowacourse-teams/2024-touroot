package kr.touroot.travelogue.fixture;

import kr.touroot.authentication.fixture.MemberFixture;
import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;

public enum TravelogueFixture {

    TRAVELOGUE(MemberFixture.MEMBER_1, "제주에 하영 옵서", "https://url.com/jeju_thumbnail.png");

    private final Member author;
    private final String title;
    private final String thumbnail;

    TravelogueFixture(Member author, String title, String thumbnail) {
        this.author = author;
        this.title = title;
        this.thumbnail = thumbnail;
    }

    public Travelogue get() {
        return new Travelogue(author, title, thumbnail);
    }

    public Travelogue create(Member author) {
        return new Travelogue(author, title, thumbnail);
    }
}
