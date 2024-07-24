package woowacourse.touroot.travelplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelplan.domain.TravelPlan;
import woowacourse.touroot.travelplan.domain.TravelPlanDay;

import java.util.List;

public interface TravelPlanDayRepository extends JpaRepository<TravelPlanDay, Long> {

    List<TravelPlanDay> findByPlan(TravelPlan travelPlan);
}
