package kr.touroot.travelplan.repository;

import java.util.List;
import java.util.Optional;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlaceTodo;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.domain.TravelPlanPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PlaceTodoRepository extends JpaRepository<TravelPlaceTodo, Long> {

    List<TravelPlaceTodo> findByTravelPlanPlace(TravelPlanPlace travelPlanPlace);

    @Query("""
            SELECT m FROM Member m
                JOIN TravelPlan p ON p.author = m
                JOIN TravelPlanDay d ON d.plan = p
                JOIN TravelPlanPlace pl ON pl.day = d
                JOIN TravelPlaceTodo t ON t.travelPlanPlace = pl
            WHERE t = :placeTodo
            """)
    Optional<Member> findOwnerOf(@Param("placeTodo") TravelPlaceTodo placeTodo);

    void deleteByTravelPlanPlaceDayPlan(TravelPlan travelPlan);
}
