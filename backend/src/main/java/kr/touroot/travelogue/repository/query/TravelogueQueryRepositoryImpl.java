package kr.touroot.travelogue.repository.query;

import static kr.touroot.travelogue.domain.QTravelogue.travelogue;
import static kr.touroot.travelogue.domain.QTravelogueTag.travelogueTag;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class TravelogueQueryRepositoryImpl implements TravelogueQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<Travelogue> findByTitleContaining(String keyword, Pageable pageable) {
        List<Travelogue> results = jpaQueryFactory.selectFrom(travelogue)
                .where(Expressions.stringTemplate("replace({0}, ' ', '')", travelogue.title)
                        .containsIgnoreCase(keyword.replace(" ", "")))
                .orderBy(travelogue.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(results, pageable, results.size());
    }

    @Override
    public Page<Travelogue> findAllByTag(List<Long> tagFilter, Pageable pageable) {
        List<Travelogue> results = jpaQueryFactory.select(travelogue)
                .from(travelogueTag)
                .where(travelogueTag.tag.id.in(tagFilter))
                .groupBy(travelogueTag.travelogue)
                .having(isSameCountWithFilter(tagFilter))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(results, pageable, results.size());
    }

    private BooleanExpression isSameCountWithFilter(List<Long> tagFilter) {
        return travelogueTag.travelogue.count()
                .eq(Long.valueOf(tagFilter.size()));
    }
}
