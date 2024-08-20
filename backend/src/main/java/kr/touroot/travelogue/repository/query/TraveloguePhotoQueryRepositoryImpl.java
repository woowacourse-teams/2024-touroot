package kr.touroot.travelogue.repository.query;

import static kr.touroot.travelogue.domain.QTravelogueDay.travelogueDay;
import static kr.touroot.travelogue.domain.QTraveloguePhoto.traveloguePhoto;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import kr.touroot.travelogue.domain.QTravelogue;
import kr.touroot.travelogue.domain.Travelogue;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class TraveloguePhotoQueryRepositoryImpl implements TraveloguePhotoQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public void deleteAllByTravelogue(Travelogue travelogue) {
        jpaQueryFactory.update(traveloguePhoto)
                .set(traveloguePhoto.deletedAt, LocalDateTime.now())
                .where(traveloguePhoto.traveloguePlace.travelogueDay.eq(
                        JPAExpressions.selectFrom(travelogueDay)
                                .leftJoin(QTravelogue.travelogue)
                                .on(QTravelogue.travelogue.eq(travelogue))
                ))
                .execute();
    }
}
