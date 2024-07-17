package woowacourse.touroot.travelogue.domain.day.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.day.domain.TravelogueDay;

public interface TravelogueDayRepository extends JpaRepository<TravelogueDay, Long> {
}
