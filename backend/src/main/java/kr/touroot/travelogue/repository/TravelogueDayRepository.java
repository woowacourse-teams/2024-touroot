package kr.touroot.travelogue.repository;

import kr.touroot.travelogue.domain.TravelogueDay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelogueDayRepository extends JpaRepository<TravelogueDay, Long> {
}
