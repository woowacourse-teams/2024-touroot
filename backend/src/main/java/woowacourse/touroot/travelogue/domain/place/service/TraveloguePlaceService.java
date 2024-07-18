package woowacourse.touroot.travelogue.domain.place.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import woowacourse.touroot.global.exception.BadRequestException;
import woowacourse.touroot.travelogue.domain.day.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.place.domain.TraveloguePlace;
import woowacourse.touroot.travelogue.domain.place.repsitory.TraveloguePlaceRepository;

@RequiredArgsConstructor
@Service
public class TraveloguePlaceService {

    private final TraveloguePlaceRepository traveloguePlaceRepository;

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
