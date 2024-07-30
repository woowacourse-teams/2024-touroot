package kr.touroot.travelplan.repository;

import java.util.List;
import kr.touroot.travelplan.domain.TravelPlanDay;
import kr.touroot.travelplan.domain.TravelPlanPlace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelPlanPlaceRepository extends JpaRepository<TravelPlanPlace, Long> {

    List<TravelPlanPlace> findByDay(TravelPlanDay day);
}
