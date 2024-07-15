package woowacourse.touroot.travelogueday.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelogueday.domain.TravelogueDay;

public interface TravelogueDayRepository extends JpaRepository<TravelogueDay, Long> {
}
