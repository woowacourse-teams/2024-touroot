package woowacourse.touroot.travelogueplace.repsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelogueplace.domain.TraveloguePlace;

public interface TraveloguePlaceRepository extends JpaRepository<TraveloguePlace, Long> {
}
