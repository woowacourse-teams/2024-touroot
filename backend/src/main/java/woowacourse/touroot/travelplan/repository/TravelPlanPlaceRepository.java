package woowacourse.touroot.travelplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelplan.domain.TravelPlanPlace;

public interface TravelPlanPlaceRepository extends JpaRepository<TravelPlanPlace, Long> {
}
