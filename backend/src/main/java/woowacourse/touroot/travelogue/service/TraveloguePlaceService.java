package woowacourse.touroot.travelogue.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import woowacourse.touroot.global.exception.BadRequestException;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.place.repository.PlaceRepository;
import woowacourse.touroot.travelogue.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.TraveloguePlace;
import woowacourse.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import woowacourse.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import woowacourse.touroot.travelogue.repository.TraveloguePlaceRepository;

@RequiredArgsConstructor
@Service
public class TraveloguePlaceService {

    private final PlaceRepository placeRepository;
    private final TraveloguePlaceRepository traveloguePlaceRepository;

    @Transactional
    public Map<TraveloguePlace, List<TraveloguePhotoRequest>> createPlaces(
            List<TraveloguePlaceRequest> requests,
            TravelogueDay day
    ) {
        Map<TraveloguePlace, List<TraveloguePhotoRequest>> places = new LinkedHashMap<>();

        for (int i = 0; i < requests.size(); i++) {
            TraveloguePlaceRequest request = requests.get(i);
            Place place = getPlace(request);

            TraveloguePlace traveloguePlace = request.toTraveloguePlace(i, place, day);
            places.put(traveloguePlaceRepository.save(traveloguePlace), request.photos());
        }

        return places;
    }

    private Place getPlace(TraveloguePlaceRequest request) {
        return placeRepository.findByNameAndLatitudeAndLongitude(
                request.name(),
                request.location().lat(),
                request.location().lng()
        ).orElseGet(() -> placeRepository.save(request.toPlace()));
    }

    @Transactional(readOnly = true)
    public List<TraveloguePlace> findTraveloguePlaceByDay(TravelogueDay travelogueDay) {
        return traveloguePlaceRepository.findByTravelogueDay(travelogueDay);
    }

    @Transactional(readOnly = true)
    public TraveloguePlace findTraveloguePlaceById(Long id) {
        return traveloguePlaceRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행 장소입니다."));
    }
}
