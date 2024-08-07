package kr.touroot.travelplan.repository;

import java.util.List;
import kr.touroot.travelplan.domain.PlaceTodo;
import kr.touroot.travelplan.domain.TravelPlanPlace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanPlaceTodoRepository extends JpaRepository<PlaceTodo, Long> {

    List<PlaceTodo> findByTravelPlanPlace(TravelPlanPlace travelPlanPlace);
}
