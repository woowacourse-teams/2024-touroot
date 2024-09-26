package kr.touroot.travelogue.repository.query;

import static kr.touroot.travelogue.domain.QTravelogue.travelogue;
import static kr.touroot.travelogue.domain.QTravelogueDay.travelogueDay;
import static kr.touroot.travelogue.domain.QTravelogueTag.travelogueTag;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueFilterCondition;
import kr.touroot.travelogue.domain.search.SearchCondition;
import kr.touroot.travelogue.domain.search.SearchType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class TravelogueQueryRepositoryImpl implements TravelogueQueryRepository {

    public static final String BLANK = " ";
    public static final String EMPTY = "";
    public static final String TEMPLATE = "replace({0}, ' ', '')";

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<Travelogue> findByKeywordAndSearchType(SearchCondition condition, Pageable pageable) {
        String keyword = condition.getKeyword();
        List<Travelogue> results = jpaQueryFactory.selectFrom(travelogue)
                .where(Expressions.stringTemplate(TEMPLATE, getTargetField(condition.getSearchType()))
                        .containsIgnoreCase(keyword.replace(BLANK, EMPTY)))
                .orderBy(travelogue.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(results, pageable, results.size());
    }

    private StringPath getTargetField(SearchType searchType) {
        if (SearchType.AUTHOR.equals(searchType)) {
            return travelogue.author.nickname;
        }
        return travelogue.title;
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

        query.where(travelogue.id.in(getTagFilterSubQuery(filter.getTag())));
    }

    private JPAQuery<Long> getTagFilterSubQuery(List<Long> tags) {
        return jpaQueryFactory.select(travelogueTag.travelogue.id)
                .from(travelogueTag)
                .where(travelogueTag.id.in(tags))
                .groupBy(travelogueTag.travelogue.id)
                .having(travelogueTag.id.count().eq(Long.valueOf(tags.size())));
    }

    public void addPeriodFilter(JPAQuery<Travelogue> query, TravelogueFilterCondition filter) {
        if (filter.isEmptyPeriodCondition()) {
            return;
        }

        if (filter.isMaxPeriod()) {
            query.where(travelogue.id
                    .in(getPeriodFilterOverMaxSubQuery(filter.getPeriod())));
            return;
        }

        query.where(travelogue.id
                .in(getPeriodFilterSubQuery(filter.getPeriod())));
    }

    private JPAQuery<Long> getPeriodFilterSubQuery(Integer period) {
        return jpaQueryFactory.select(travelogueDay.travelogue.id)
                .from(travelogueDay)
                .where(travelogueDay.deletedAt.isNull())
                .groupBy(travelogueDay.travelogue.id)
                .having(travelogueDay.id.count().eq(Long.valueOf(period)));
    }

    private JPAQuery<Long> getPeriodFilterOverMaxSubQuery(Integer period) {
        return jpaQueryFactory.select(travelogueDay.travelogue.id)
                .from(travelogueDay)
                .where(travelogueDay.deletedAt.isNull())
                .groupBy(travelogueDay.travelogue.id)
                .having(travelogueDay.id.count().goe(Long.valueOf(period)));
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
