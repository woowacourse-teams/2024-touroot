package kr.touroot.travelplan.repository;

import java.util.List;
import kr.touroot.travelplan.domain.TravelPlaceTodo;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.domain.TravelPlanPlace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceTodoRepository extends JpaRepository<TravelPlaceTodo, Long> {

    List<TravelPlaceTodo> findByTravelPlanPlace(TravelPlanPlace travelPlanPlace);

    void deleteByTravelPlanPlaceDayPlan(TravelPlan travelPlan);
}
