package woowacourse.touroot.travelogue.domain.place.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import woowacourse.touroot.travelogue.domain.day.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.day.repository.TravelogueDayRepository;
import woowacourse.touroot.travelogue.domain.place.domain.TraveloguePlace;
import woowacourse.touroot.travelogue.domain.place.repsitory.TraveloguePlaceRepository;

@RequiredArgsConstructor
@Service
public class TraveloguePlaceService {

    private TraveloguePlaceRepository traveloguePlaceRepository;
    private TravelogueDayRepository travelogueDayRepository;

    public List<TraveloguePlace> findTraveloguePlaceByDayId(Long travelogueDayId) {
        TravelogueDay travelogueDay = travelogueDayRepository.findById(travelogueDayId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 여행일입니다."));

        return traveloguePlaceRepository.findByTravelogueDay(travelogueDay);
    }
}
