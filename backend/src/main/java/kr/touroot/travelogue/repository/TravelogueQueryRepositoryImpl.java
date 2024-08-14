package kr.touroot.travelogue.repository;

import static kr.touroot.travelogue.domain.QTravelogue.travelogue;

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
}
