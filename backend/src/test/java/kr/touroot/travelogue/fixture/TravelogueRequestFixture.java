package kr.touroot.travelogue.fixture;

import java.util.List;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.dto.request.TraveloguePositionRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import org.springframework.stereotype.Component;

@Component
public class TravelogueRequestFixture {

    private TravelogueRequestFixture() {
    }

    public static TravelogueRequest getTravelogueRequest(List<TravelogueDayRequest> days) {
        return new TravelogueRequest(
                "제주에 하영 옵서",
                "https://dev.touroot.kr/images/jeju_thumbnail.png",
                List.of(),
                days
        );
    }

    public static TravelogueRequest getTravelogueRequest(List<TravelogueDayRequest> days, List<Long> tags) {
        return new TravelogueRequest(
                "제주에 하영 옵서",
                "https://dev.touroot.kr/images/jeju_thumbnail.png",
                tags,
                days
        );
    }

    public static TravelogueRequest getUpdateTravelogueRequest(List<TravelogueDayRequest> days) {
        return new TravelogueRequest(
                "삼춘! 제주에 하영 옵서!",
                "https://dev.touroot.kr/images/jeju_thumbnail_2.png",
                List.of(),
                days
        );
    }

    public static List<TravelogueDayRequest> getTravelogueDayRequests(List<TraveloguePlaceRequest> places) {
        return List.of(new TravelogueDayRequest(places));
    }

    public static List<TravelogueDayRequest> getUpdateTravelogueDayRequests(List<TraveloguePlaceRequest> places) {
        return List.of(new TravelogueDayRequest(places), new TravelogueDayRequest(places));
    }

    public static List<TraveloguePlaceRequest> getTraveloguePlaceRequests(List<TraveloguePhotoRequest> photos) {
        return List.of(new TraveloguePlaceRequest(
                "함덕 해수욕장",
                getTraveloguePositionRequest(),
                "에메랄드 빛 해변",
                photos,
                "KR"
        ));
    }

    public static List<TraveloguePlaceRequest> getTraveloguePlaceRequestsWithNoneCountryCode(
            List<TraveloguePhotoRequest> photos) {
        return List.of(new TraveloguePlaceRequest(
                "함덕 해수욕장",
                getTraveloguePositionRequest(),
                "에메랄드 빛 해변",
                photos,
                "NONE"
        ));
    }


    public static List<TraveloguePlaceRequest> getUpdateTraveloguePlaceRequests(List<TraveloguePhotoRequest> photos) {
        return List.of(new TraveloguePlaceRequest(
                "함덕 해수욕장",
                getTraveloguePositionRequest(),
                "에메랄드 빛 해변은 해외 휴양지와 견줘도 밀리지 않습니다.",
                photos,
                "KR"
        ));
    }

    public static TraveloguePositionRequest getTraveloguePositionRequest() {
        return new TraveloguePositionRequest("34.54343", "126.66977");
    }

    public static List<TraveloguePhotoRequest> getTraveloguePhotoRequests() {
        return List.of(new TraveloguePhotoRequest("https://dev.touroot.kr/images/image1.png"));
    }

    public static List<TraveloguePhotoRequest> getTraveloguePhotoRequestsOverLimit() {
        return List.of(
                new TraveloguePhotoRequest("https://dev.touroot.kr/images/image1.png"),
                new TraveloguePhotoRequest("https://dev.touroot.kr/images/image2.png"),
                new TraveloguePhotoRequest("https://dev.touroot.kr/images/image3.png"),
                new TraveloguePhotoRequest("https://dev.touroot.kr/images/image4.png"),
                new TraveloguePhotoRequest("https://dev.touroot.kr/images/image5.png"),
                new TraveloguePhotoRequest("https://dev.touroot.kr/images/image6.png"),
                new TraveloguePhotoRequest("https://dev.touroot.kr/images/image7.png"),
                new TraveloguePhotoRequest("https://dev.touroot.kr/images/image8.png"),
                new TraveloguePhotoRequest("https://dev.touroot.kr/images/image9.png"),
                new TraveloguePhotoRequest("https://dev.touroot.kr/images/image10.png"),
                new TraveloguePhotoRequest("https://dev.touroot.kr/images/image11.png")
        );
    }
}
