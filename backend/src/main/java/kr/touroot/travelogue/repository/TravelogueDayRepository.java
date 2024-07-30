package kr.touroot.travelogue.repository;

import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelogueDayRepository extends JpaRepository<TravelogueDay, Long> {

    List<TravelogueDay> findByTravelogue(Travelogue travelogue);
}
