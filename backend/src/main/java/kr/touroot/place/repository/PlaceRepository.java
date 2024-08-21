package kr.touroot.place.repository;

import java.util.Optional;
import kr.touroot.place.domain.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<Place, Long> {

    Optional<Place> findByNameAndLatitudeAndLongitude(String name, String lat, String lng);
}
