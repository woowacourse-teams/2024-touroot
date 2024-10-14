package kr.touroot.travelplan.repository;

import kr.touroot.travelplan.domain.TravelPlanDay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelPlanDayRepository extends JpaRepository<TravelPlanDay, Long> {
}
