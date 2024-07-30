package kr.touroot.travelogue.fixture;

import kr.touroot.travelogue.domain.Travelogue;

public enum TravelogueFixture {

    TRAVELOGUE("제주에 하영 옵서", "https://url.com/jeju_thumbnail.png");

    private final String title;
    private final String thumbnail;

    TravelogueFixture(String title, String thumbnail) {
        this.title = title;
        this.thumbnail = thumbnail;
    }

    public Travelogue get() {
        return new Travelogue(title, thumbnail);
    }
}
