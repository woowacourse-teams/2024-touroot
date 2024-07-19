package woowacourse.touroot.travelogue.domain.day.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import woowacourse.touroot.global.exception.BadRequestException;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.day.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.day.repository.TravelogueDayRepository;
import woowacourse.touroot.travelogue.dto.TravelogueDayRequest;
import woowacourse.touroot.travelogue.dto.TraveloguePlaceRequest;

@RequiredArgsConstructor
@Service
public class TravelogueDayService {

    private final TravelogueDayRepository travelogueDayRepository;

    @Transactional
    public Map<TravelogueDay, List<TraveloguePlaceRequest>> createDays(
            List<TravelogueDayRequest> requests,
            Travelogue travelogue
    ) {
        Map<TravelogueDay, List<TraveloguePlaceRequest>> daysWithPlaceRequests = new LinkedHashMap<>();

        for (int i = 0; i < requests.size(); i++) {
            TravelogueDayRequest request = requests.get(i);
            TravelogueDay travelogueDay = request.toTravelogueDay(i, travelogue);
            daysWithPlaceRequests.put(travelogueDayRepository.save(travelogueDay), request.places());
        }

        return daysWithPlaceRequests;
    }

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
