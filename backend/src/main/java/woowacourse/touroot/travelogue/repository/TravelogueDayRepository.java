package woowacourse.touroot.travelogue.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.TravelogueDay;

public interface TravelogueDayRepository extends JpaRepository<TravelogueDay, Long> {

    List<TravelogueDay> findByTravelogue(Travelogue travelogue);
}
