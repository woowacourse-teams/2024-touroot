package kr.touroot.travelogue.repository.query;

import static kr.touroot.travelogue.domain.QTravelogueLike.travelogueLike;

import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Optional;
import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.TravelogueLike;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;


@RequiredArgsConstructor
@Repository
public class TravelogueLikeQueryRepositoryImpl implements TravelogueLikeQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public long countTravelougeLikeByRank(int rank) {
        Long likeCount = jpaQueryFactory.select(travelogueLike.count())
                .from(travelogueLike)
                .groupBy(travelogueLike.travelogue.id)
                .orderBy(travelogueLike.count().desc())
                .offset(rank - 1L)
                .limit(1)
                .fetchOne();

        return Optional.ofNullable(likeCount).orElse(0L);
    }

    @Override
    public Page<TravelogueLike> findAllByLiker(Member liker, Pageable pageable) {
        List<TravelogueLike> travelogueLikes = jpaQueryFactory.select(travelogueLike)
                .from(travelogueLike)
                .join(travelogueLike.travelogue).fetchJoin()
                .join(travelogueLike.travelogue.author).fetchJoin()
                .where(travelogueLike.liker.eq(liker))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(travelogueLikes, pageable, travelogueLikes.size());
    }
}
