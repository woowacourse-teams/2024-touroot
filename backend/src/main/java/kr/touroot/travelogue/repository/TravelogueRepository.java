package kr.touroot.travelogue.repository;

import kr.touroot.travelogue.domain.Travelogue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelogueRepository extends JpaRepository<Travelogue, Long> {
}
