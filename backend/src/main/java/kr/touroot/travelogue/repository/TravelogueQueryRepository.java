package kr.touroot.travelogue.repository;

import kr.touroot.travelogue.domain.Travelogue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TravelogueQueryRepository {

    Page<Travelogue> findByTitleContaining(String keyword, Pageable pageable);
}
