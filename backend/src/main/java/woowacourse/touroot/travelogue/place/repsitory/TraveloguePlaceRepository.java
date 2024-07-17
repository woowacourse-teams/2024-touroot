package woowacourse.touroot.travelogue.place.repsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelogue.place.domain.TraveloguePlace;

public interface TraveloguePlaceRepository extends JpaRepository<TraveloguePlace, Long> {
}
