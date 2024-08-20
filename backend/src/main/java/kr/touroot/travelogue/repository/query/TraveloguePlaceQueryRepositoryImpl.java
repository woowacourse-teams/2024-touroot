package kr.touroot.travelogue.repository.query;

import static kr.touroot.travelogue.domain.QTraveloguePlace.traveloguePlace;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import kr.touroot.travelogue.domain.Travelogue;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class TraveloguePlaceQueryRepositoryImpl implements TraveloguePlaceQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public void deleteAllByTravelogue(Travelogue travelogue) {
        jpaQueryFactory.update(traveloguePlace)
                .set(traveloguePlace.deletedAt, LocalDateTime.now())
                .where(traveloguePlace.travelogueDay.travelogue.eq(travelogue))
                .execute();
    }
}
