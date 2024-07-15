package woowacourse.touroot.traveloguephoto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.traveloguephoto.domain.TraveloguePhoto;

public interface TraveloguePhotoRepository extends JpaRepository<TraveloguePhoto, Long> {
}
