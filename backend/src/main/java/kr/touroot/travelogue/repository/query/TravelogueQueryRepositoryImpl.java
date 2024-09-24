package kr.touroot.travelogue.repository.query;

import static kr.touroot.travelogue.domain.QTravelogue.travelogue;
import static kr.touroot.travelogue.domain.QTravelogueTag.travelogueTag;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueFilterCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class TravelogueQueryRepositoryImpl implements TravelogueQueryRepository {

    private static final int MAX_PERIOD_BOUNDARY = 8;
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
    public Page<Travelogue> findAllByFilter(TravelogueFilterCondition filter, Pageable pageable) {
        JPAQuery<Travelogue> query = jpaQueryFactory.select(travelogue)
                .from(travelogueTag);

        addTagFilter(query, filter.getTag());
        addPeriodFilter(query, filter.getPeriod());

        List<Travelogue> results = query.orderBy(findSortCondition(pageable.getSort()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(results, pageable, results.size());
    }

    public void addTagFilter(JPAQuery<Travelogue> query, List<Long> tags) {
        if (tags == null) {
            return;
        }

        query.where(travelogueTag.tag.id.in(tags))
                .groupBy(travelogueTag.travelogue)
                .having(travelogueTag.travelogue.count()
                        .eq(Long.valueOf(tags.size()))
                );
    }

    public void addPeriodFilter(JPAQuery<Travelogue> query, Integer period) {
        if (period == null) {
            return;
        }

        if (period == MAX_PERIOD_BOUNDARY) {
            query.where(travelogueTag.travelogue.travelogueDays.size().goe(MAX_PERIOD_BOUNDARY));
            return;
        }

        query.where(travelogueTag.travelogue.travelogueDays.size().eq(period));
    }

    private OrderSpecifier<?> findSortCondition(Sort sort) {
        Sort.Order order = sort.iterator()
                .next();
        String sortBy = order.getProperty();
        Order direction = getDirection(order);

        if (sortBy.equals("createdAt")) {
            return new OrderSpecifier<>(direction, travelogueTag.travelogue.createdAt);
        }

        return new OrderSpecifier<>(direction, travelogueTag.travelogue.likeCount);
    }

    private Order getDirection(Sort.Order order) {
        if (order.isAscending()) {
            return Order.ASC;
        }

        return Order.DESC;
    }
}
