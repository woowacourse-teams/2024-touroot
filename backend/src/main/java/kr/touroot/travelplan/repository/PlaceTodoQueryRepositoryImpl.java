package kr.touroot.travelplan.repository;

import static kr.touroot.member.domain.QMember.member;
import static kr.touroot.travelplan.domain.QTravelPlaceTodo.travelPlaceTodo;
import static kr.touroot.travelplan.domain.QTravelPlan.travelPlan;
import static kr.touroot.travelplan.domain.QTravelPlanDay.travelPlanDay;
import static kr.touroot.travelplan.domain.QTravelPlanPlace.travelPlanPlace;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Optional;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlaceTodo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class PlaceTodoQueryRepositoryImpl implements PlaceTodoQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Optional<Member> findOwnerOf(TravelPlaceTodo placeTodo) {
        jpaQueryFactory.selectFrom(member)
                .innerJoin(travelPlan.author, member)
                .innerJoin(travelPlanDay.plan, travelPlan)
                .innerJoin(travelPlanPlace.day, travelPlanDay)
                .innerJoin(travelPlaceTodo.travelPlanPlace, travelPlanPlace)
                .where(travelPlaceTodo.eq(placeTodo))
                .fetch();
        return Optional.empty();
    }
}
