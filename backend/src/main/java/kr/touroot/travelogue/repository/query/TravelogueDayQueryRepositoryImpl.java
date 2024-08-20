package kr.touroot.travelogue.repository.query;

import static kr.touroot.travelogue.domain.QTravelogueDay.travelogueDay;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import kr.touroot.travelogue.domain.Travelogue;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class TravelogueDayQueryRepositoryImpl implements TravelogueDayQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public void deleteAllByTravelogue(Travelogue travelogue) {
        jpaQueryFactory.update(travelogueDay)
                .set(travelogueDay.deletedAt, LocalDateTime.now())
                .where(travelogueDay.travelogue.eq(travelogue))
                .execute();
    }
}
