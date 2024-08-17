package kr.touroot.travelogue.repository;

import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelogueLikeRepository extends JpaRepository<TravelogueLike, Long> {
    Long countByTravelogue(Travelogue travelogue);
}
