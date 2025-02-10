package kr.touroot.travelogue.repository;

import kr.touroot.travelogue.domain.TraveloguePlace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TraveloguePlaceRepository extends JpaRepository<TraveloguePlace, Long> {
}
