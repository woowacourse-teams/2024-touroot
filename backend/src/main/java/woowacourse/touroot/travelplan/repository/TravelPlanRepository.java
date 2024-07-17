package woowacourse.touroot.travelplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelplan.domain.TravelPlan;

public interface TravelPlanRepository extends JpaRepository<TravelPlan, Long> {
}
