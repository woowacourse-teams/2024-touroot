package woowacourse.touroot.travelplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelplan.domain.TravelPlanDay;
import woowacourse.touroot.travelplan.domain.TravelPlanPlace;

import java.util.List;

public interface TravelPlanPlaceRepository extends JpaRepository<TravelPlanPlace, Long> {

    List<TravelPlanPlace> findByDay(TravelPlanDay day);
}
