package kr.touroot.travelogue.fixture;

import java.time.LocalDate;
import java.util.List;
import kr.touroot.tag.fixture.TagFixture;
import kr.touroot.travelogue.dto.response.TravelogueDayResponse;
import kr.touroot.travelogue.dto.response.TraveloguePlaceResponse;
import kr.touroot.travelogue.dto.response.TraveloguePositionResponse;
import kr.touroot.travelogue.dto.response.TravelogueResponse;
import kr.touroot.travelogue.dto.response.TravelogueSimpleResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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
                .tags(List.of())
                .isLiked(false)
                .likeCount(0L)
                .build();
    }

    public static TravelogueResponse getUpdatedTravelogueResponse() {
        return TravelogueResponse.builder()
                .id(1L)
                .title("삼춘! 제주에 하영 옵서!")
                .createdAt(LocalDate.now())
                .authorNickname("리비")
                .authorId(1L)
                .authorProfileImageUrl("https://dev.touroot.kr/temporary/profile.png")
                .thumbnail("https://dev.touroot.kr/temporary/jeju_thumbnail_2.png")
                .days(getUpdatedTravelogueDayResponses())
                .tags(List.of())
                .isLiked(false)
                .likeCount(0L)
                .build();
    }

    public static TravelogueResponse getTravelogueResponseWithTag() {
        return TravelogueResponse.builder()
                .id(1L)
                .title("제주에 하영 옵서")
                .createdAt(LocalDate.now())
                .authorNickname("리비")
                .authorId(1L)
                .authorProfileImageUrl("https://dev.touroot.kr/temporary/profile.png")
                .thumbnail("https://dev.touroot.kr/temporary/jeju_thumbnail.png")
                .days(getTravelogueDayResponses())
                .tags(List.of(TagFixture.TAG_1.getResponse(1L)))
                .likeCount(0L)
                .isLiked(false)
                .build();
    }

    public static TravelogueResponse getTravelogueResponseWithLike() {
        return TravelogueResponse.builder()
                .id(1L)
                .title("제주에 하영 옵서")
                .createdAt(LocalDate.now())
                .authorNickname("리비")
                .authorId(2L)
                .authorProfileImageUrl("https://dev.touroot.kr/temporary/profile.png")
                .thumbnail("https://dev.touroot.kr/temporary/jeju_thumbnail.png")
                .days(getTravelogueDayResponses())
                .tags(List.of())
                .isLiked(true)
                .likeCount(1L)
                .build();
    }

    public static Page<TravelogueSimpleResponse> getTravelogueSimpleResponses() {
        List<TravelogueSimpleResponse> responses = List.of(
                TravelogueSimpleResponse.builder()
                        .id(2L)
                        .title("제주에 하영 옵서")
                        .authorNickname("리비")
                        .authorProfileUrl("https://dev.touroot.kr/temporary/profile.png")
                        .thumbnail("https://dev.touroot.kr/temporary/jeju_thumbnail.png")
                        .tags(List.of(TagFixture.TAG_1.getResponse(1L)))
                        .likeCount(0L)
                        .build(),
                TravelogueSimpleResponse.builder()
                        .id(1L)
                        .title("제주에 하영 옵서")
                        .authorNickname("리비")
                        .authorProfileUrl("https://dev.touroot.kr/temporary/profile.png")
                        .thumbnail("https://dev.touroot.kr/temporary/jeju_thumbnail.png")
                        .tags(List.of())
                        .likeCount(1L)
                        .build()
        );

        return new PageImpl<>(responses, PageRequest.of(0, 5, Sort.by(Direction.DESC, "id")), responses.size());
    }

    public static List<TravelogueDayResponse> getTravelogueDayResponses() {
        return List.of(TravelogueDayResponse.builder()
                .id(1L)
                .places(getTraveloguePlaceResponses())
                .build()
        );
    }

    public static List<TravelogueDayResponse> getUpdatedTravelogueDayResponses() {
        return List.of(TravelogueDayResponse.builder()
                        .id(2L)
                        .places(getUpdatedTraveloguePlaceResponses())
                        .build(),
                TravelogueDayResponse.builder()
                        .id(3L)
                        .places(getAddedTraveloguePlaceResponsesWhenUpdate())
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

    public static List<TraveloguePlaceResponse> getUpdatedTraveloguePlaceResponses() {
        return List.of(TraveloguePlaceResponse.builder()
                .id(2L)
                .placeName("함덕해수욕장")
                .description("에메랄드 빛 해변은 해외 휴양지와 견줘도 밀리지 않습니다.")
                .position(getTraveloguePositionResponse())
                .photoUrls(getTraveloguePhotoUrls())
                .build()
        );
    }

    public static List<TraveloguePlaceResponse> getAddedTraveloguePlaceResponsesWhenUpdate() {
        return List.of(TraveloguePlaceResponse.builder()
                .id(3L)
                .placeName("함덕해수욕장")
                .description("에메랄드 빛 해변은 해외 휴양지와 견줘도 밀리지 않습니다.")
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
