package kr.touroot.travelplan.repository;

import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelPlanRepository extends JpaRepository<TravelPlan, Long> {

    Page<TravelPlan> findAllByAuthor(Member member, Pageable pageable);
}
