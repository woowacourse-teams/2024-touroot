package kr.touroot.travelogue.repository;

import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TraveloguePhotoRepository extends JpaRepository<TraveloguePhoto, Long> {

    List<TraveloguePhoto> findByTraveloguePlace(TraveloguePlace traveloguePlace);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("UPDATE TraveloguePhoto to SET to.deletedAt = NOW() WHERE to.traveloguePlace.travelogueDay.travelogue = :travelogue")
    void deleteAllByTraveloguePlaceTravelogueDayTravelogue(Travelogue travelogue);
}
