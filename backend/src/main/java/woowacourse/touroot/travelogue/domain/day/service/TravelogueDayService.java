package woowacourse.touroot.travelogue.domain.day.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import woowacourse.touroot.global.exception.BadRequestException;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.day.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.day.repository.TravelogueDayRepository;

@RequiredArgsConstructor
@Service
public class TravelogueDayService {

    private final TravelogueDayRepository travelogueDayRepository;

    @Transactional(readOnly = true)
    public List<TravelogueDay> findDaysByTravelogue(Travelogue travelogue) {
        return travelogueDayRepository.findByTravelogue(travelogue);
    }

    @Transactional(readOnly = true)
    public TravelogueDay findDayById(Long id) {
        return travelogueDayRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행 일자입니다."));
    }
}
