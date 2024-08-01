package kr.touroot.travelogue.fixture;

import java.util.List;
import org.springframework.stereotype.Component;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.dto.request.TraveloguePositionRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;

@Component
public class TravelogueRequestFixture {

    private TravelogueRequestFixture() {
    }

    public static TravelogueRequest getTravelogueRequest() {
        return new TravelogueRequest("제주에 하영 옵서", "https://dev.touroot.kr/temporary/jeju_thumbnail.png", getTravelogueDayRequests());
    }

    public static List<TravelogueDayRequest> getTravelogueDayRequests() {
        return List.of(new TravelogueDayRequest(getTraveloguePlaceRequests()));
    }

    public static List<TraveloguePlaceRequest> getTraveloguePlaceRequests() {
        return List.of(new TraveloguePlaceRequest(
                "함덕해수욕장",
                getTraveloguePositionRequest(),
                "에메랄드 빛 해변",
                getTraveloguePhotoRequests()
        ));
    }

    public static TraveloguePositionRequest getTraveloguePositionRequest() {
        return new TraveloguePositionRequest("34.54343", "126.66977");
    }

    public static List<TraveloguePhotoRequest> getTraveloguePhotoRequests() {
        return List.of(new TraveloguePhotoRequest("https://dev.touroot.kr/temporary/image1.png"));
    }
}
