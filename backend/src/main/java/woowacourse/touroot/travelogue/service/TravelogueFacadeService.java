package woowacourse.touroot.travelogue.service;

import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.day.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.day.dto.TravelogueDayResponse;
import woowacourse.touroot.travelogue.domain.day.service.TravelogueDayService;
import woowacourse.touroot.travelogue.domain.photo.service.TraveloguePhotoService;
import woowacourse.touroot.travelogue.domain.place.domain.TraveloguePlace;
import woowacourse.touroot.travelogue.domain.place.dto.TraveloguePlaceResponse;
import woowacourse.touroot.travelogue.domain.place.service.TraveloguePlaceService;
import woowacourse.touroot.travelogue.dto.TravelogueResponse;

@RequiredArgsConstructor
@Service
public class TravelogueFacadeService {

    private final TravelogueService travelogueService;
    private final TravelogueDayService travelogueDayService;
    private final TraveloguePlaceService traveloguePlaceService;
    private final TraveloguePhotoService traveloguePhotoService;

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
        List<TravelogueDay> travelogueDays = travelogueDayService.findDaysByTravelogueId(travelogue.getId());

        return travelogueDays.stream()
                .sorted(Comparator.comparing(TravelogueDay::getOrder))
                .map(this::getTravelogueDayResponse)
                .toList();
    }

    private TravelogueDayResponse getTravelogueDayResponse(final TravelogueDay day) {
        return TravelogueDayResponse.builder()
                .id(day.getId())
                .places(findPlacesOfTravelogueDay(day))
                .build();
    }

    private List<TraveloguePlaceResponse> findPlacesOfTravelogueDay(TravelogueDay travelogueDay) {
        List<TraveloguePlace> places = traveloguePlaceService.findTraveloguePlaceByDayId(travelogueDay.getId());

        return places.stream()
                .sorted(Comparator.comparing(TraveloguePlace::getOrder))
                .map(this::getTraveloguePlaceResponse)
                .toList();
    }

    private TraveloguePlaceResponse getTraveloguePlaceResponse(final TraveloguePlace place) {
        return TraveloguePlaceResponse.builder()
                .id(place.getId())
                .name(place.getName())
                .description(place.getDescription())
                .lat(place.getLatitude())
                .lng(place.getLongitude())
                .photoUrls(findPhotoUrlsOfTraveloguePlace(place))
                .build();
    }

    private List<String> findPhotoUrlsOfTraveloguePlace(TraveloguePlace traveloguePlace) {
        return traveloguePhotoService.findPhotoUrlsByPlaceId(traveloguePlace.getId());
    }
}
