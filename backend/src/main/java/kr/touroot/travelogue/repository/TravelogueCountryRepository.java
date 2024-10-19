package kr.touroot.travelogue.repository;

import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueCountry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravelogueCountryRepository extends JpaRepository<TravelogueCountry, Long> {

    void deleteAllByTravelogue(Travelogue travelogue);
}
