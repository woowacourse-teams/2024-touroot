package woowacourse.touroot.travelogue.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelogue.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.domain.TraveloguePlace;

public interface TraveloguePhotoRepository extends JpaRepository<TraveloguePhoto, Long> {

    List<TraveloguePhoto> findByTraveloguePlace(TraveloguePlace traveloguePlace);
}
