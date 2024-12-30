package kr.touroot.travelogue.service;

import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.repository.TravelogueDayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TravelogueDayService {

    private final TravelogueDayRepository travelogueDayRepository;

    public TravelogueDay save(TravelogueDay travelogueDay) {
        return travelogueDayRepository.save(travelogueDay);
    }
}
