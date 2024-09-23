package kr.touroot.travelogue.repository.query;

import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.dto.request.TravelogueSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TravelogueQueryRepository {

    Page<Travelogue> findBySearchRequest(TravelogueSearchRequest request, Pageable pageable);

    Page<Travelogue> findAllByTag(List<Long> tagFilter, Pageable pageable);
}
