package kr.touroot.travelplan.repository;

import java.util.List;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.domain.TravelPlanDay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelPlanDayRepository extends JpaRepository<TravelPlanDay, Long> {

    List<TravelPlanDay> findByPlan(TravelPlan travelPlan);
}
