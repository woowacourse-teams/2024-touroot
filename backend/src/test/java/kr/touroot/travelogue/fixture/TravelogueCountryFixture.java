package kr.touroot.travelogue.fixture;

import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueCountry;
import kr.touroot.travelogue.domain.search.CountryCode;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TravelogueCountryFixture {
    TRAVELOGUE_COUNTRY(CountryCode.KR, 1L);

    private final CountryCode countryCode;
    private final Long count;

    public TravelogueCountry create(Travelogue travelogue) {
        return new TravelogueCountry(travelogue, countryCode, count);
    }
}
