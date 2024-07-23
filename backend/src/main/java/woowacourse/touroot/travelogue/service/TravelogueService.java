package woowacourse.touroot.travelogue.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import woowacourse.touroot.global.exception.BadRequestException;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.dto.request.TravelogueRequest;
import woowacourse.touroot.travelogue.repository.TravelogueRepository;

@RequiredArgsConstructor
@Service
public class TravelogueService {

    private final TravelogueRepository travelogueRepository;

    public Travelogue createTravelogue(TravelogueRequest request) {
        Travelogue travelogue = request.toTravelogue();
        return travelogueRepository.save(travelogue);
    }

    public Travelogue getTravelogueById(Long id) {
        return travelogueRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행기입니다."));
    }

    public Page<Travelogue> findAll(Pageable pageable) {
        return travelogueRepository.findAll(pageable);
    }
}
