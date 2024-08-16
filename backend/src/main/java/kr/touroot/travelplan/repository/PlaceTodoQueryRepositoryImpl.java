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
        return Optional.ofNullable(
                jpaQueryFactory.select(member)
                        .from(member)
                        .innerJoin(travelPlan).on(travelPlan.author.eq(member))
                        .innerJoin(travelPlanDay).on(travelPlanDay.plan.eq(travelPlan))
                        .innerJoin(travelPlanPlace).on(travelPlanPlace.day.eq(travelPlanDay))
                        .innerJoin(travelPlaceTodo).on(travelPlaceTodo.travelPlanPlace.eq(travelPlanPlace))
                        .where(travelPlaceTodo.eq(placeTodo))
                        .fetchOne()
        );
    }
}
