package kr.touroot.travelogue.repository.query;

import static kr.touroot.travelogue.domain.QTravelogueTag.travelogueTag;

import com.querydsl.jpa.impl.JPAQueryFactory;
import kr.touroot.travelogue.domain.Travelogue;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class TravelogueTagQueryRepositoryImpl implements TravelogueTagQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public void deleteAllByTravelogue(Travelogue travelogue) {
        jpaQueryFactory.delete(travelogueTag)
                .where(travelogueTag.travelogue.eq(travelogue))
                .execute();
    }
}
