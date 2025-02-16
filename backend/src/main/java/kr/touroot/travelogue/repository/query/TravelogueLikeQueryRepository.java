package kr.touroot.travelogue.repository.query;

import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.TravelogueLike;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TravelogueLikeQueryRepository {

    long countTravelougeLikeByRank(int rank);

    Page<TravelogueLike> findAllByLiker(Member liker, Pageable pageable);
}
