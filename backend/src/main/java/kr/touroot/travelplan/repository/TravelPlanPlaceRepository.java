package kr.touroot.travelplan.repository;

import kr.touroot.travelplan.domain.TravelPlanPlace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelPlanPlaceRepository extends JpaRepository<TravelPlanPlace, Long> {
}
