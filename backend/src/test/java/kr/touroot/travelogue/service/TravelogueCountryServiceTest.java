package kr.touroot.travelogue.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import kr.touroot.global.ServiceTest;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueCountry;
import kr.touroot.travelogue.domain.search.CountryCode;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.fixture.TravelogueRequestFixture;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

@DisplayName("여행기 국가 서비스")
@Import(value = {TravelogueCountryService.class, TravelogueTestHelper.class})
@ServiceTest
class TravelogueCountryServiceTest {

    public static final int BASIC_PAGE_SIZE = 5;

    private final TravelogueCountryService travelogueCountryService;
    private final DatabaseCleaner databaseCleaner;
    private final TravelogueTestHelper testHelper;

    @Autowired
    public TravelogueCountryServiceTest(
            TravelogueCountryService travelogueCountryService,
            DatabaseCleaner databaseCleaner,
            TravelogueTestHelper testHelper
    ) {
        this.travelogueCountryService = travelogueCountryService;
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

    @DisplayName("여행기 국가들을 생성할 수 있다.")
    @Test
    void createTravelogueCountries() {
        // given
        Travelogue travelogue = testHelper.initTravelogueTestDataWithoutCountryCode();
        TravelogueRequest travelogueRequest = getTravelogueRequest();

        // when
        List<TravelogueCountry> travelogueCountries =
                travelogueCountryService.createTravelogueCountries(travelogue, travelogueRequest);

        // then
        assertAll(
                () -> assertThat(travelogueCountries).hasSize(1),
                () -> assertThat(travelogueCountries.get(0).getTravelogue().getId()).isEqualTo(1L),
                () -> assertThat(travelogueCountries.get(0).getCount()).isEqualTo(1),
                () -> assertThat(travelogueCountries.get(0).getCountryCode()).isEqualTo(CountryCode.KR)
        );
    }

    @DisplayName("여행기 장소의 국가 코드가 None 이면 여행기 국가가 생성되지 않는다.")
    @Test
    void createTravelogueCountriesWithNoneCountryCode() {
        // given
        Travelogue travelogue = testHelper.initTravelogueTestDataWithNoneCountryCode();
        TravelogueRequest travelogueRequest = getTravelogueRequestWithNoneCountryCode();

        // when
        List<TravelogueCountry> travelogueCountries =
                travelogueCountryService.createTravelogueCountries(travelogue, travelogueRequest);

        // then
        assertThat(travelogueCountries).isEmpty();
    }

    @DisplayName("여행기의 여행기 국가를 조회할 수 있다.")
    @Test
    void getTravelogueCountryByTravelogue() {
        // given
        Travelogue travelogue = testHelper.initTravelogueTestDataWithoutCountryCode();
        TravelogueRequest travelogueRequest = getTravelogueRequest();
        travelogueCountryService.createTravelogueCountries(travelogue, travelogueRequest);

        // when
        List<TravelogueCountry> travelogueCountries = travelogueCountryService.getTravelogueCountryByTravelogue(
                travelogue);

        // then
        assertAll(
                () -> assertThat(travelogueCountries).hasSize(1),
                () -> assertThat(travelogueCountries.get(0).getTravelogue().getId()).isEqualTo(1L),
                () -> assertThat(travelogueCountries.get(0).getCount()).isEqualTo(1),
                () -> assertThat(travelogueCountries.get(0).getCountryCode()).isEqualTo(CountryCode.KR)
        );
    }

    @DisplayName("여행기 국가를 업데이트 할 수 있다.")
    @Test
    void updateTravelogueCountries() {
        // given
        Travelogue travelogue = testHelper.initTravelogueTestDataWithoutCountryCode();
        TravelogueRequest travelogueRequest = getTravelogueRequest();
        Travelogue newTravelogue = testHelper.initTravelogueTestDataWithNoneCountryCode();
        TravelogueRequest newTravelogueRequest = getTravelogueRequestWithNoneCountryCode();
        travelogueCountryService.createTravelogueCountries(travelogue, travelogueRequest);

        // when
        List<TravelogueCountry> travelogueCountries =
                travelogueCountryService.updateTravelogueCountries(newTravelogue, newTravelogueRequest);

        // then
        assertThat(travelogueCountries).isEmpty();
    }

    @DisplayName("여행기 국가를 업데이트 할 수 있다.")
    @Test
    void deleteAllByTravelogue() {
        // given
        Travelogue travelogue = testHelper.initTravelogueTestDataWithoutCountryCode();
        TravelogueRequest travelogueRequest = getTravelogueRequest();
        travelogueCountryService.createTravelogueCountries(travelogue, travelogueRequest);

        // when
        travelogueCountryService.deleteAllByTravelogue(travelogue);

        // then
        assertThat(travelogueCountryService.getTravelogueCountryByTravelogue(travelogue)).isEmpty();
    }

    private TravelogueRequest getTravelogueRequest() {
        List<TraveloguePhotoRequest> photos = TravelogueRequestFixture.getTraveloguePhotoRequests();
        List<TraveloguePlaceRequest> places = TravelogueRequestFixture.getTraveloguePlaceRequests(photos);
        List<TravelogueDayRequest> days = TravelogueRequestFixture.getTravelogueDayRequests(places);
        return TravelogueRequestFixture.getTravelogueRequest(days);
    }

    private TravelogueRequest getTravelogueRequestWithNoneCountryCode() {
        List<TraveloguePhotoRequest> photos = TravelogueRequestFixture.getTraveloguePhotoRequests();
        List<TraveloguePlaceRequest> places =
                TravelogueRequestFixture.getTraveloguePlaceRequestsWithNoneCountryCode(photos);
        List<TravelogueDayRequest> days = TravelogueRequestFixture.getTravelogueDayRequests(places);
        return TravelogueRequestFixture.getTravelogueRequest(days);
    }
}
