package woowacourse.touroot.travelogue.service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.day.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.day.dto.TravelogueDayResponse;
import woowacourse.touroot.travelogue.domain.day.service.TravelogueDayService;
import woowacourse.touroot.travelogue.domain.photo.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.domain.photo.service.TraveloguePhotoService;
import woowacourse.touroot.travelogue.domain.place.domain.TraveloguePlace;
import woowacourse.touroot.travelogue.domain.place.dto.TravelogueLocationResponse;
import woowacourse.touroot.travelogue.domain.place.dto.TraveloguePlaceResponse;
import woowacourse.touroot.travelogue.domain.place.service.TraveloguePlaceService;
import woowacourse.touroot.travelogue.dto.TravelogueDayRequest;
import woowacourse.touroot.travelogue.dto.TraveloguePhotoRequest;
import woowacourse.touroot.travelogue.dto.TraveloguePlaceRequest;
import woowacourse.touroot.travelogue.dto.TravelogueRequest;
import woowacourse.touroot.travelogue.dto.TravelogueResponse;

@RequiredArgsConstructor
@Service
public class TravelogueFacadeService {

    private final TravelogueService travelogueService;
    private final TravelogueDayService travelogueDayService;
    private final TraveloguePlaceService traveloguePlaceService;
    private final TraveloguePhotoService traveloguePhotoService;

    public TravelogueResponse createTravelogue(TravelogueRequest request) {
        Travelogue travelogue = travelogueService.createTravelogue(request);
        List<TravelogueDayRequest> dayRequests = request.days();

        return TravelogueResponse.builder()
                .id(travelogue.getId())
                .title(travelogue.getTitle())
                .thumbnail(travelogue.getThumbnail())
                .days(createDays(dayRequests, travelogue))
                .build();
    }

    private List<TravelogueDayResponse> createDays(List<TravelogueDayRequest> requests, Travelogue travelogue) {
        Map<TravelogueDay, List<TraveloguePlaceRequest>> days = travelogueDayService.createDays(requests, travelogue);

        return days.keySet()
                .stream()
                .map(travelogueDay -> TravelogueDayResponse.builder()
                        .id(travelogueDay.getId())
                        .places(createPlaces(days.get(travelogueDay), travelogueDay))
                        .build())
                .toList();
    }

    private List<TraveloguePlaceResponse> createPlaces(List<TraveloguePlaceRequest> requests, TravelogueDay day) {
        Map<TraveloguePlace, List<TraveloguePhotoRequest>> places = traveloguePlaceService.createPlaces(requests, day);

        return places.keySet()
                .stream()
                .map(traveloguePlace -> TraveloguePlaceResponse.builder()
                        .id(traveloguePlace.getId())
                        .name(traveloguePlace.getName())
                        .description(traveloguePlace.getDescription())
                        .location(getTravelogueLocationResponse(traveloguePlace))
                        .photoUrls(createPhotos(places.get(traveloguePlace), traveloguePlace))
                        .build())
                .toList();
    }

    private List<String> createPhotos(List<TraveloguePhotoRequest> requests, TraveloguePlace place) {
        List<TraveloguePhoto> photos = traveloguePhotoService.createPhotos(requests, place);

        return photos.stream()
                .map(TraveloguePhoto::getKey)
                .toList();
    }

    public TravelogueResponse findTravelogueById(Long id) {
        Travelogue travelogue = travelogueService.getTravelogueById(id);

        return TravelogueResponse.builder()
                .id(travelogue.getId())
                .title(travelogue.getTitle())
                .thumbnail(travelogue.getThumbnail())
                .days(findDaysOfTravelogue(travelogue))
                .build();
    }

    private List<TravelogueDayResponse> findDaysOfTravelogue(Travelogue travelogue) {
        List<TravelogueDay> travelogueDays = travelogueDayService.findDaysByTravelogue(travelogue);

        return travelogueDays.stream()
                .sorted(Comparator.comparing(TravelogueDay::getOrder))
                .map(this::getTravelogueDayResponse)
                .toList();
    }

    private TravelogueDayResponse getTravelogueDayResponse(TravelogueDay day) {
        return TravelogueDayResponse.builder()
                .id(day.getId())
                .places(findPlacesOfTravelogueDay(day))
                .build();
    }

    private List<TraveloguePlaceResponse> findPlacesOfTravelogueDay(TravelogueDay travelogueDay) {
        List<TraveloguePlace> places = traveloguePlaceService.findTraveloguePlaceByDay(travelogueDay);

        return places.stream()
                .sorted(Comparator.comparing(TraveloguePlace::getOrder))
                .map(this::getTraveloguePlaceResponse)
                .toList();
    }

    private TraveloguePlaceResponse getTraveloguePlaceResponse(TraveloguePlace place) {
        return TraveloguePlaceResponse.builder()
                .id(place.getId())
                .name(place.getName())
                .description(place.getDescription())
                .location(getTravelogueLocationResponse(place))
                .photoUrls(findPhotoUrlsOfTraveloguePlace(place))
                .build();
    }

    private static TravelogueLocationResponse getTravelogueLocationResponse(TraveloguePlace place) {
        return TravelogueLocationResponse.builder()
                .lat(place.getLatitude())
                .lng(place.getLongitude())
                .build();
    }

    private List<String> findPhotoUrlsOfTraveloguePlace(TraveloguePlace place) {
        return traveloguePhotoService.findPhotoUrlsByPlace(place);
    }
}
