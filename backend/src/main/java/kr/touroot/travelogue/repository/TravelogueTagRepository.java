package kr.touroot.travelogue.repository;

import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TravelogueTagRepository extends JpaRepository<TravelogueTag, Long> {

    List<TravelogueTag> findAllByTravelogue(Travelogue travelogue);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("DELETE TravelogueTag tt WHERE tt.travelogue = :travelogue")
    void deleteAllByTravelogue(Travelogue travelogue);
}
