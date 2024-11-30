package kr.touroot.travelogue.fixture;


import java.util.List;
import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TravelogueFixture {

    JEJU_TRAVELOGUE(
            "제주에 하영 옵서",
            "https://dev.touroot.kr/temporary/jeju_thumbnail.png"
    ),
    ;

    private final String title;
    private final String thumbnail;

    public Travelogue getTravelogueOwnedBy(Member author) {
        return new Travelogue(author, title, thumbnail);
    }

    public TravelogueRequest getCreateRequestWith(List<Long> tagIds, TravelogueDayRequest... travelogueDayRequests) {
        return new TravelogueRequest(title, thumbnail, tagIds, List.of(travelogueDayRequests));
    }

    public TravelogueRequest getCreateRequestWith(TravelogueDayRequest... travelogueDayRequests) {
        return getCreateRequestWith(List.of(), travelogueDayRequests);
    }
}
