package kr.touroot.travelogue.repository;

import java.util.List;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePlace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TraveloguePlaceRepository extends JpaRepository<TraveloguePlace, Long> {

    List<TraveloguePlace> findByTravelogueDay(TravelogueDay travelogueDay);

    void deleteByTravelogueDayTravelogueId(Long travelogueId);
}
