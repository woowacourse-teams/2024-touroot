package kr.touroot.travelogue.repository.query;

import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.dto.request.TravelogueFilterCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TravelogueQueryRepository {

    Page<Travelogue> findByTitleContaining(String keyword, Pageable pageable);

    Page<Travelogue> findAllByTag(TravelogueFilterCondition filter, Pageable pageable);
}
