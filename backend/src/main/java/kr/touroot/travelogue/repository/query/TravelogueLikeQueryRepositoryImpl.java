package kr.touroot.travelogue.repository.query;

import static kr.touroot.travelogue.domain.QTravelogueLike.travelogueLike;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


@RequiredArgsConstructor
@Repository
public class TravelogueLikeQueryRepositoryImpl implements TravelogueLikeQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public int countTravelougeLikeByRank(int rank) {
        Long likeCount = jpaQueryFactory.select(travelogueLike.count())
                .from(travelogueLike)
                .groupBy(travelogueLike.travelogue.id)
                .orderBy(travelogueLike.count().desc())
                .offset(rank - 1L)
                .limit(1)
                .fetchOne();
        if (likeCount == null) {
            return 0;
        }
        return likeCount.intValue();
    }
}
