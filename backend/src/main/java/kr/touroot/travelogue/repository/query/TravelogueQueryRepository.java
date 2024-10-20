package kr.touroot.travelogue.repository.query;

import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueFilterCondition;
import kr.touroot.travelogue.domain.search.CountryCode;
import kr.touroot.travelogue.domain.search.SearchCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TravelogueQueryRepository {

    Page<Travelogue> findByKeywordAndSearchType(SearchCondition condition, Pageable pageable);

    Page<Travelogue> findByKeywordAndCountryCode(CountryCode countryCode, Pageable pageable);

    Page<Travelogue> findAllByFilter(TravelogueFilterCondition filter, Pageable pageable);
}
