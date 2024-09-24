package kr.touroot.travelogue.repository.query;

import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueFilterCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TravelogueQueryRepository {

    Page<Travelogue> findByTitleContaining(String keyword, Pageable pageable);

    Page<Travelogue> findAllByFilter(TravelogueFilterCondition filter, Pageable pageable);
}
