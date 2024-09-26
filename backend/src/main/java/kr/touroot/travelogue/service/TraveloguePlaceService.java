package kr.touroot.travelogue.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePlace;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.repository.TraveloguePlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TraveloguePlaceService {

    private final TraveloguePlaceRepository traveloguePlaceRepository;

    @Transactional
    public Map<TraveloguePlace, List<TraveloguePhotoRequest>> createPlaces(
            List<TraveloguePlaceRequest> requests,
            TravelogueDay day
    ) {
        Map<TraveloguePlace, List<TraveloguePhotoRequest>> places = new LinkedHashMap<>();

        for (int i = 0; i < requests.size(); i++) {
            TraveloguePlaceRequest request = requests.get(i);
            TraveloguePlace traveloguePlace = request.toTraveloguePlace(i, day);
            places.put(traveloguePlaceRepository.save(traveloguePlace), request.photoUrls());
        }

        return places;
    }


    @Transactional(readOnly = true)
    public List<TraveloguePlace> findTraveloguePlacesByDay(TravelogueDay travelogueDay) {
        return traveloguePlaceRepository.findByTravelogueDay(travelogueDay);
    }

    @Transactional(readOnly = true)
    public TraveloguePlace findTraveloguePlaceById(Long id) {
        return traveloguePlaceRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행기 장소입니다."));
    }

    @Transactional
    public void deleteAllByTravelogue(Travelogue travelogue) {
        traveloguePlaceRepository.deleteAllByTravelogueDayTravelogue(travelogue);
    }
}
