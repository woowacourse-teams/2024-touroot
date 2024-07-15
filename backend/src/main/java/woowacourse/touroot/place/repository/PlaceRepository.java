package woowacourse.touroot.place.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.place.domain.Place;

public interface PlaceRepository extends JpaRepository<Place, Long> {
}
