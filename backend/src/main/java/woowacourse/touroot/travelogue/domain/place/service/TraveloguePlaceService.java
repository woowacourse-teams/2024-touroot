package woowacourse.touroot.travelogue.domain.place.service;

import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import woowacourse.touroot.travelogue.domain.day.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.day.repository.TravelogueDayRepository;
import woowacourse.touroot.travelogue.domain.place.domain.TraveloguePlace;
import woowacourse.touroot.travelogue.domain.place.dto.TraveloguePlaceResponse;
import woowacourse.touroot.travelogue.domain.place.repsitory.TraveloguePlaceRepository;

@RequiredArgsConstructor
@Service
public class TraveloguePlaceService {

    private TraveloguePlaceRepository traveloguePlaceRepository;
    private TravelogueDayRepository travelogueDayRepository;

    public List<TraveloguePlaceResponse> findTraveloguePlaceByDayId(Long travelogueDayId) {
        TravelogueDay travelogueDay = travelogueDayRepository.findById(travelogueDayId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 여행일입니다."));

        List<TraveloguePlace> places = traveloguePlaceRepository.findByTravelogueDay(travelogueDay);

        return places.stream()
                .sorted(Comparator.comparing(TraveloguePlace::getOrder))
                .map(place -> TraveloguePlaceResponse.builder()
                        .id(place.getId())
                        .name(place.getName())
                        .description(place.getDescription())
                        .lat(place.getLatitude())
                        .lng(place.getLongitude())
                        .build())
                .toList();
    }
}
