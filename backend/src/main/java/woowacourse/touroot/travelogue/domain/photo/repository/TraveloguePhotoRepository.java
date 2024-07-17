package woowacourse.touroot.travelogue.domain.photo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelogue.domain.photo.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.domain.place.domain.TraveloguePlace;

public interface TraveloguePhotoRepository extends JpaRepository<TraveloguePhoto, Long> {

    List<TraveloguePhoto> findByTraveloguePlace(TraveloguePlace traveloguePlace);
}
