package woowacourse.touroot.travelogue.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import woowacourse.touroot.global.ServiceTest;
import woowacourse.touroot.global.exception.BadRequestException;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.TraveloguePlace;
import woowacourse.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import woowacourse.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import woowacourse.touroot.travelogue.fixture.TravelogueTestFixture;
import woowacourse.touroot.travelogue.helper.TravelogueTestHelper;
import woowacourse.touroot.utils.DatabaseCleaner;

@DisplayName("여행기 장소 서비스")
@ServiceTest
class TraveloguePlaceServiceTest {

    private final TraveloguePlaceService placeService;
    private final DatabaseCleaner databaseCleaner;
    private final TravelogueTestHelper testHelper;

    @Autowired
    public TraveloguePlaceServiceTest(
            TraveloguePlaceService placeService,
            DatabaseCleaner databaseCleaner,
            TravelogueTestHelper testHelper
    ) {
        this.placeService = placeService;
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

    @DisplayName("여행기 장소를 생성한다.")
    @Test
    void createPlaces() {
        List<TraveloguePlaceRequest> requests = TravelogueTestFixture.getTraveloguePlaceRequests();
        Travelogue travelogue = testHelper.persistTravelogue();
        TravelogueDay day = testHelper.persistTravelogueDay(travelogue);

        Map<TraveloguePlace, List<TraveloguePhotoRequest>> placesMap = placeService.createPlaces(requests, day);
        List<TraveloguePlace> places = placesMap.keySet().stream().toList();

        assertAll(
                () -> assertThat(placesMap.keySet()).hasSize(requests.size()),
                () -> assertThat(placesMap).containsEntry(places.get(0), requests.get(0).photos())
        );
    }

    @DisplayName("여행기 장소를 여행기 일자를 기준으로 조회한다.")
    @Test
    void findTraveloguePlacesByDay() {
        Travelogue travelogue = testHelper.persistTravelogue();
        TravelogueDay day = testHelper.persistTravelogueDay(travelogue);
        Place location = testHelper.persistPlace();
        TraveloguePlace place = testHelper.persistTraveloguePlace(location, day);

        List<TraveloguePlace> places = placeService.findTraveloguePlacesByDay(day);

        assertThat(places).contains(place);
    }

    @DisplayName("여행기 장소를 ID를 기준으로 조회한다.")
    @Test
    void findTraveloguePlaceById() {
        testHelper.initTravelogueTestData();

        assertDoesNotThrow(() -> placeService.findTraveloguePlaceById(1L));
    }

    @DisplayName("존재하지 않는 여행기 장소 ID로 조회하면 예외가 발생한다.")
    @Test
    void findDayByInvalidIdThrowException() {
        assertThatThrownBy(() -> placeService.findTraveloguePlaceById(1L))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행기 장소입니다.");
    }
}
