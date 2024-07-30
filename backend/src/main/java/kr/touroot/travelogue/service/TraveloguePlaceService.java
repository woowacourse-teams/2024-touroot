package kr.touroot.travelogue.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.place.domain.Place;
import kr.touroot.place.repository.PlaceRepository;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePlace;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.repository.TraveloguePlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TraveloguePlaceService {

    private final PlaceRepository placeRepository;
    private final TraveloguePlaceRepository traveloguePlaceRepository;

    public Map<TraveloguePlace, List<TraveloguePhotoRequest>> createPlaces(
            List<TraveloguePlaceRequest> requests,
            TravelogueDay day
    ) {
        Map<TraveloguePlace, List<TraveloguePhotoRequest>> places = new LinkedHashMap<>();

        for (int i = 0; i < requests.size(); i++) {
            TraveloguePlaceRequest request = requests.get(i);
            Place place = getPlace(request);

            TraveloguePlace traveloguePlace = request.toTraveloguePlace(i, place, day);
            places.put(traveloguePlaceRepository.save(traveloguePlace), request.photoUrls());
        }

        return places;
    }

    private Place getPlace(TraveloguePlaceRequest request) {
        return placeRepository.findByNameAndLatitudeAndLongitude(
                request.placeName(),
                request.position().lat(),
                request.position().lng()
        ).orElseGet(() -> placeRepository.save(request.toPlace()));
    }

    public List<TraveloguePlace> findTraveloguePlacesByDay(TravelogueDay travelogueDay) {
        return traveloguePlaceRepository.findByTravelogueDay(travelogueDay);
    }

    public TraveloguePlace findTraveloguePlaceById(Long id) {
        return traveloguePlaceRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행기 장소입니다."));
    }
}
