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
        JPAQuery<Travelogue> query = jpaQueryFactory.selectFrom(travelogue);

        addTagFilter(query, filter);
        addPeriodFilter(query, filter);

        List<Travelogue> results = query.orderBy(findSortCondition(pageable.getSort()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(results, pageable, results.size());
    }

    public void addTagFilter(JPAQuery<Travelogue> query, TravelogueFilterCondition filter) {
        if (filter.isEmptyTagCondition()) {
            return;
        }

        List<Long> tags = filter.getTag();

        query.join(travelogueTag).on(travelogueTag.travelogue.eq(travelogue))
                .where(travelogueTag.tag.id.in(tags))
                .groupBy(travelogue)
                .having(travelogueTag.count().eq(Long.valueOf(tags.size())));
    }

    public void addPeriodFilter(JPAQuery<Travelogue> query, TravelogueFilterCondition filter) {
        if (filter.isEmptyPeriodCondition()) {
            return;
        }

        if (filter.isMaxPeriod()) {
            query.where(travelogue.travelogueDays.size().goe(TravelogueFilterCondition.MAX_PERIOD_BOUNDARY));
            return;
        }

        query.where(travelogue.travelogueDays.size().eq(filter.getPeriod()));
    }

    private OrderSpecifier<?> findSortCondition(Sort sort) {
        Sort.Order order = sort.iterator()
                .next();
        String sortBy = order.getProperty();
        Order direction = getDirection(order);

        if (sortBy.equals("createdAt")) {
            return new OrderSpecifier<>(direction, travelogue.createdAt);
        }

        return new OrderSpecifier<>(direction, travelogue.likeCount);
    }

    private Order getDirection(Sort.Order order) {
        if (order.isAscending()) {
            return Order.ASC;
        }

        return Order.DESC;
    }
}
