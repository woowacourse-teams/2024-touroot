package woowacourse.touroot.travelplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelplan.domain.TravelPlanDay;

public interface TravelPlanDayRepository extends JpaRepository<TravelPlanDay, Long> {
}
