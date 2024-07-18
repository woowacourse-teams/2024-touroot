package woowacourse.touroot.travelogue.domain.day.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.day.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.day.repository.TravelogueDayRepository;
import woowacourse.touroot.travelogue.repository.TravelogueRepository;

@RequiredArgsConstructor
@Service
public class TravelogueDayService {

    private TravelogueRepository travelogueRepository;
    private TravelogueDayRepository travelogueDayRepository;

    @Transactional(readOnly = true)
    public List<TravelogueDay> findDaysByTravelogueId(Long travelogueId) {
        Travelogue travelogue = travelogueRepository.findById(travelogueId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 여행기입니다."));

        return travelogueDayRepository.findByTravelogue(travelogue);
    }
}
