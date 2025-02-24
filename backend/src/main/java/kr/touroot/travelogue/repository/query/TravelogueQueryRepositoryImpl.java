package kr.touroot.travelogue.repository.query;

import static kr.touroot.travelogue.domain.QTravelogue.travelogue;
import static kr.touroot.travelogue.domain.QTravelogueCountry.travelogueCountry;
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
import kr.touroot.travelogue.domain.search.CountryCode;
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
    public Page<Travelogue> findAllByCondition(
            SearchCondition searchCondition,
            TravelogueFilterCondition filterCondition,
            Pageable pageable
    ) {
        JPAQuery<Travelogue> baseQuery = jpaQueryFactory.selectFrom(travelogue);

        addSearchCondition(baseQuery, searchCondition);
        addFilterCondition(baseQuery, filterCondition);

        List<Travelogue> results = baseQuery.orderBy(findSortCondition(pageable.getSort()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(results, pageable, results.size());
    }

    private void addSearchCondition(JPAQuery<Travelogue> query, SearchCondition condition) {
        String keyword = condition.getKeyword();

        if (condition.getSearchType() == SearchType.COUNTRY) {
            CountryCode countryCode = CountryCode.findByName(keyword);
            findByCountryCode(query, countryCode);
            return;
        }

        if (condition.getSearchType() == SearchType.AUTHOR || condition.getSearchType() == SearchType.TITLE) {
            findByTitleOrAuthor(condition, query, keyword);
        }
    }

    private void findByCountryCode(JPAQuery<Travelogue> query, CountryCode countryCode) {
        query.join(travelogueCountry)
                .on(travelogue.id.eq(travelogueCountry.travelogue.id))
                .where(travelogueCountry.countryCode.eq(countryCode));
    }

    private void findByTitleOrAuthor(SearchCondition condition, JPAQuery<Travelogue> query, String keyword) {
        query.where(Expressions.stringTemplate(TEMPLATE, getTargetField(condition.getSearchType()))
                        .containsIgnoreCase(keyword.replace(BLANK, EMPTY)))
                .orderBy(travelogue.id.desc());
    }

    private StringPath getTargetField(SearchType searchType) {
        if (SearchType.AUTHOR.equals(searchType)) {
            return travelogue.author.nickname;
        }
        return travelogue.title;
    }

    private void addFilterCondition(JPAQuery<Travelogue> query, TravelogueFilterCondition filter) {
        addTagFilter(query, filter);
        addPeriodFilter(query, filter);
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

    // TODO: 프론트엔드 엔드포인트 이전 작업 완료 후 제거
    @Override
    public Page<Travelogue> findAllBySearchCondition(SearchCondition condition, Pageable pageable) {
        String keyword = condition.getKeyword();
        JPAQuery<Travelogue> query = jpaQueryFactory.selectFrom(travelogue);

        if (condition.getSearchType() == SearchType.COUNTRY) {
            CountryCode countryCode = CountryCode.findByName(keyword);
            findByCountryCode(query, countryCode);
        }

        if (condition.getSearchType() == SearchType.AUTHOR || condition.getSearchType() == SearchType.TITLE) {
            findByTitleOrAuthor(condition, query, keyword);
        }

        List<Travelogue> results = query.offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(results, pageable, results.size());
    }
}
