package kr.touroot.travelogue.repository;

import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TraveloguePlaceRepository extends JpaRepository<TraveloguePlace, Long> {

    List<TraveloguePlace> findByTravelogueDay(TravelogueDay travelogueDay);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("UPDATE TraveloguePlace tp SET tp.deletedAt = NOW() WHERE tp.travelogueDay.travelogue = :travelogue")
    void deleteAllByTravelogueDayTravelogue(Travelogue travelogue);
}
