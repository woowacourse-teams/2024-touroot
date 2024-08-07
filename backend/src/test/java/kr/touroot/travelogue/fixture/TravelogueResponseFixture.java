package kr.touroot.travelogue.fixture;

import java.time.LocalDate;
import java.util.List;
import kr.touroot.travelogue.dto.response.TravelogueDayResponse;
import kr.touroot.travelogue.dto.response.TraveloguePlaceResponse;
import kr.touroot.travelogue.dto.response.TraveloguePositionResponse;
import kr.touroot.travelogue.dto.response.TravelogueResponse;
import kr.touroot.travelogue.dto.response.TravelogueSimpleResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

@Component
public class TravelogueResponseFixture {

    private TravelogueResponseFixture() {
    }

    public static TravelogueResponse getTravelogueResponse() {
        return TravelogueResponse.builder()
                .id(1L)
                .title("제주에 하영 옵서")
                .createdAt(LocalDate.now())
                .authorNickname("리비")
                .authorId(1L)
                .authorProfileImageUrl("https://dev.touroot.kr/temporary/profile.png")
                .thumbnail("https://dev.touroot.kr/temporary/jeju_thumbnail.png")
                .days(getTravelogueDayResponses())
                .build();
    }

    public static Page<TravelogueSimpleResponse> getTravelogueSimpleResponses() {
        return new PageImpl<>(List.of(TravelogueSimpleResponse.builder()
                .id(1L)
                .title("제주에 하영 옵서")
                .authorNickname("리비")
                .authorProfileUrl("https://dev.touroot.kr/temporary/profile.png")
                .thumbnail("https://dev.touroot.kr/temporary/jeju_thumbnail.png")
                .build()));
    }

    public static List<TravelogueDayResponse> getTravelogueDayResponses() {
        return List.of(TravelogueDayResponse.builder()
                .id(1L)
                .places(getTraveloguePlaceResponses())
                .build()
        );
    }

    public static List<TraveloguePlaceResponse> getTraveloguePlaceResponses() {
        return List.of(TraveloguePlaceResponse.builder()
                .id(1L)
                .placeName("함덕해수욕장")
                .description("에메랄드 빛 해변")
                .position(getTraveloguePositionResponse())
                .photoUrls(getTraveloguePhotoUrls())
                .build()
        );
    }

    public static TraveloguePositionResponse getTraveloguePositionResponse() {
        return TraveloguePositionResponse.builder()
                .id(1L)
                .lat("34.54343")
                .lng("126.66977")
                .build();
    }

    public static List<String> getTraveloguePhotoUrls() {
        return List.of("https://dev.touroot.kr/temporary/image1.png");
    }
}
