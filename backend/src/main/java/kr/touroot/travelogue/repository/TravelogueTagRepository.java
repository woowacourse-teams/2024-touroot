package kr.touroot.travelogue.repository;

import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelogueTagRepository extends JpaRepository<TravelogueTag, Long> {

    List<TravelogueTag> findAllByTravelogue(Travelogue travelogue);
}
