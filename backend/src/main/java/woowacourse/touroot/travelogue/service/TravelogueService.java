package woowacourse.touroot.travelogue.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.repository.TravelogueRepository;

@RequiredArgsConstructor
@Service
public class TravelogueService {

    private final TravelogueRepository travelogueRepository;

    @Transactional(readOnly = true)
    public Travelogue findTravelogueById(Long id) {
        return travelogueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 여행기입니다."));
    }
}
