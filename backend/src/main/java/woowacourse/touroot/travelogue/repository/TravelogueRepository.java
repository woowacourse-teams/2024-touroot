package woowacourse.touroot.travelogue.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.travelogue.domain.Travelogue;

public interface TravelogueRepository extends JpaRepository<Travelogue, Long> {
}
