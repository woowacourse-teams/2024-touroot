package woowacourse.touroot.travelogue.photo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelogue.photo.domain.TraveloguePhoto;

public interface TraveloguePhotoRepository extends JpaRepository<TraveloguePhoto, Long> {
}
