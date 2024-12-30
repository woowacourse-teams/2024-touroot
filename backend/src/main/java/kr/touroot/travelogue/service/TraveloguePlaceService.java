package kr.touroot.travelogue.service;

import kr.touroot.travelogue.domain.TraveloguePlace;
import kr.touroot.travelogue.repository.TraveloguePlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TraveloguePlaceService {

    private final TraveloguePlaceRepository traveloguePlaceRepository;

    public TraveloguePlace save(TraveloguePlace traveloguePlace) {
        return traveloguePlaceRepository.save(traveloguePlace);
    }
}
