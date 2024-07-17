package woowacourse.touroot.travelogue.domain.place.repsitory;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelogue.domain.day.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.place.domain.TraveloguePlace;

public interface TraveloguePlaceRepository extends JpaRepository<TraveloguePlace, Long> {
    
    List<TraveloguePlace> findByTravelogueDay(TravelogueDay travelogueDay);
}
