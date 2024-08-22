package kr.touroot.travelogue.repository.query;

import static kr.touroot.travelogue.domain.QTravelogueLike.travelogueLike;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.touroot.travelogue.domain.Travelogue;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class TravelogueLikeQueryRepositoryImpl implements TravelogueLikeQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public void deleteAllByTravelogue(Travelogue travelogue) {
        jpaQueryFactory.delete(travelogueLike)
                .where(travelogueLike.travelogue.eq(travelogue))
                .execute();
    }
}
