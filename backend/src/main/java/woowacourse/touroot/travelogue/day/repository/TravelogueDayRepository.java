package woowacourse.touroot.travelogue.day.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelogue.day.domain.TravelogueDay;

public interface TravelogueDayRepository extends JpaRepository<TravelogueDay, Long> {
}
