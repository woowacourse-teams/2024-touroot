package kr.touroot.travelogue.repository.query;

import java.util.List;
import kr.touroot.travelogue.domain.SearchCondition;
import kr.touroot.travelogue.domain.Travelogue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TravelogueQueryRepository {

    Page<Travelogue> findByKeywordAndSearchType(SearchCondition condition, Pageable pageable);

    Page<Travelogue> findAllByTag(List<Long> tagFilter, Pageable pageable);
}
