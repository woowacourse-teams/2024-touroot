package woowacourse.touroot.travelogue.fixture;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.domain.TraveloguePlace;
import woowacourse.touroot.travelogue.dto.request.TravelogueDayRequest;
import woowacourse.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import woowacourse.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import woowacourse.touroot.travelogue.dto.request.TraveloguePositionRequest;
import woowacourse.touroot.travelogue.dto.request.TravelogueRequest;
import woowacourse.touroot.travelogue.dto.response.TravelogueDayResponse;
import woowacourse.touroot.travelogue.dto.response.TraveloguePlaceResponse;
import woowacourse.touroot.travelogue.dto.response.TraveloguePositionResponse;
import woowacourse.touroot.travelogue.dto.response.TravelogueResponse;

@Component
public class TravelogueTestFixture {

    private TravelogueTestFixture() {
    }

    public static Travelogue getTravelogue() {
        return new Travelogue("낭만의 시베리아 횡단철도 여행", "https://photo-key.jpeg");
    }

    public static TravelogueDay getTravelogueDay() {
        return new TravelogueDay(1, getTravelogue());
    }

    public static Place getPlace() {
        return new Place("블라디보스토크", "37.1234", "127.1234", "");
    }

    public static TraveloguePlace getTraveloguePlace() {
        return new TraveloguePlace(1, "극동의 진주, 블라디보스토크.", getPlace(), getTravelogueDay());
    }

    public static TraveloguePhoto getTraveloguePhoto() {
        return new TraveloguePhoto(1, "https://photo-key.jpeg", getTraveloguePlace());
    }

    public static TravelogueRequest getTravelogueRequest() {
        return new TravelogueRequest("낭만의 시베리아 횡단철도 여행", "https://photo-key.jpeg", getTravelogueDayRequests());
    }

    public static List<TravelogueDayRequest> getTravelogueDayRequests() {
        return List.of(new TravelogueDayRequest(getTraveloguePlaceRequests()));
    }

    public static List<TraveloguePlaceRequest> getTraveloguePlaceRequests() {
        return List.of(new TraveloguePlaceRequest(
                "블라디보스토크",
                getTraveloguePositionRequest(),
                "극동의 진주, 블라디보스토크.",
                getTraveloguePhotoRequests()
        ));
    }

    public static TraveloguePositionRequest getTraveloguePositionRequest() {
        return new TraveloguePositionRequest("37.1234", "127.1234");
    }

    public static List<TraveloguePhotoRequest> getTraveloguePhotoRequests() {
        return List.of(new TraveloguePhotoRequest("https://photo-key.jpeg"));
    }

    public static TravelogueResponse getTravelogueResponse() {
        return TravelogueResponse.builder()
                .id(1L)
                .title("낭만의 시베리아 횡단철도 여행")
                .thumbnail("https://photo-key.jpeg")
                .days(getTravelogueDayResponses())
                .build();
    }

    public static Page<TravelogueResponse> getTravelogueResponses() {
        return new PageImpl<>(List.of(TravelogueResponse.builder()
                .id(1L)
                .title("낭만의 시베리아 횡단철도 여행")
                .thumbnail("https://photo-key.jpeg")
                .days(getTravelogueDayResponses())
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
                .placeName("블라디보스토크")
                .description("극동의 진주, 블라디보스토크.")
                .position(getTraveloguePositionResponse())
                .photoUrls(getTraveloguePhotoUrls())
                .build()
        );
    }

    public static TraveloguePositionResponse getTraveloguePositionResponse() {
        return TraveloguePositionResponse.builder()
                .lat("37.1234")
                .lng("127.1234")
                .build();
    }

    public static List<String> getTraveloguePhotoUrls() {
        return List.of("https://photo-key.jpeg");
    }
}
