package kr.touroot.travelogue.repository;

import kr.touroot.travelogue.domain.TraveloguePhoto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TraveloguePhotoRepository extends JpaRepository<TraveloguePhoto, Long> {
}
