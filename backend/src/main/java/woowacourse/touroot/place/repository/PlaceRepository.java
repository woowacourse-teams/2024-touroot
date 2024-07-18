package woowacourse.touroot.place.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.place.domain.Place;

import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {

    Optional<Place> findByNameAndLatitudeAndLongitude(String name, String lat, String lng);
}
