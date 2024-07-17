package woowacourse.touroot.travelogue.domain.place.repsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelogue.domain.day.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.place.domain.TraveloguePlace;

public interface TraveloguePlaceRepository extends JpaRepository<TraveloguePlace, Long> {
}
