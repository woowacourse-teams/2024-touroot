package kr.touroot.travelogue.repository;

import java.util.List;
import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TraveloguePhotoRepository extends JpaRepository<TraveloguePhoto, Long> {

    List<TraveloguePhoto> findByTraveloguePlace(TraveloguePlace traveloguePlace);
}
