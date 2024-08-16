package kr.touroot.travelogue.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.repository.TravelogueDayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행기 일자입니다."));
    }

    @Transactional
    public void deleteAllByTravelogue(Travelogue travelogue) {
        travelogueDayRepository.deleteAllByTravelogue(travelogue);
    }
}
