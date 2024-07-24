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
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.TravelogueDay;
import woowacourse.touroot.travelogue.dto.request.TravelogueDayRequest;
import woowacourse.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import woowacourse.touroot.travelogue.fixture.TravelogueTestFixture;
import woowacourse.touroot.travelogue.helper.TravelogueTestHelper;
import woowacourse.touroot.utils.DatabaseCleaner;

@DisplayName("여행기 일자 서비스")
@ServiceTest
class TravelogueDayServiceTest {

    private final TravelogueDayService dayService;
    private final DatabaseCleaner databaseCleaner;
    private final TravelogueTestHelper testHelper;

    @Autowired
    public TravelogueDayServiceTest(
            TravelogueDayService dayService,
            DatabaseCleaner databaseCleaner,
            TravelogueTestHelper testHelper
    ) {
        this.dayService = dayService;
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

    @DisplayName("여행기의 일자들을 생성한다.")
    @Test
    void createDays() {
        List<TravelogueDayRequest> requests = TravelogueTestFixture.getTravelogueDayRequests();
        Travelogue travelogue = testHelper.persistTravelogue();

        Map<TravelogueDay, List<TraveloguePlaceRequest>> daysMap = dayService.createDays(requests, travelogue);
        List<TravelogueDay> days = daysMap.keySet().stream().toList();

        assertAll(
                () -> assertThat(daysMap.keySet()).hasSize(requests.size()),
                () -> assertThat(daysMap).containsEntry(days.get(0), requests.get(0).places())
        );
    }

    @DisplayName("여행기를 기준으로 여행 일자들을 조회한다.")
    @Test
    void findDaysByTravelogue() {
        Travelogue travelogue = testHelper.persistTravelogue();
        TravelogueDay travelogueDay = testHelper.persistTravelogueDay(travelogue);

        List<TravelogueDay> days = dayService.findDaysByTravelogue(travelogue);

        assertThat(days).contains(travelogueDay);
    }

    @DisplayName("여행 일자를 ID를 기준으로 조회한다.")
    @Test
    void findDayById() {
        testHelper.initTravelogueTestData();

        assertDoesNotThrow(() -> dayService.findDayById(1L));
    }

    @DisplayName("존재하지 않는 여행기 일자 ID로 조회하면 예외가 발생한다.")
    @Test
    void findDayByInvalidIdThrowException() {
        assertThatThrownBy(() -> dayService.findDayById(1L))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행기 일자입니다.");
    }
}
