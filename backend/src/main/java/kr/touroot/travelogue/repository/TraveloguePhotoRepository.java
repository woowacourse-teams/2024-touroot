package kr.touroot.travelogue.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;

public interface TraveloguePhotoRepository extends JpaRepository<TraveloguePhoto, Long> {

    List<TraveloguePhoto> findByTraveloguePlace(TraveloguePlace traveloguePlace);
}
