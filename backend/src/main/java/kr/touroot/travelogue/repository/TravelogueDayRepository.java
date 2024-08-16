package kr.touroot.travelogue.repository;

import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TravelogueDayRepository extends JpaRepository<TravelogueDay, Long> {

    List<TravelogueDay> findByTravelogue(Travelogue travelogue);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("UPDATE TravelogueDay td SET td.deletedAt = NOW() WHERE td.travelogue = :travelogue")
    void deleteAllByTravelogue(Travelogue travelogue);
}
