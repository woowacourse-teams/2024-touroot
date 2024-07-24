package woowacourse.touroot.travelogue.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import woowacourse.touroot.global.ServiceTest;
import woowacourse.touroot.global.exception.BadRequestException;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.dto.request.TravelogueRequest;
import woowacourse.touroot.travelogue.fixture.TravelogueTestFixture;
import woowacourse.touroot.travelogue.helper.TravelogueTestHelper;
import woowacourse.touroot.utils.DatabaseCleaner;

@DisplayName("여행기 서비스")
@ServiceTest
class TravelogueServiceTest {

    public static final int BASIC_PAGE_SIZE = 5;

    private final TravelogueService travelogueService;
    private final DatabaseCleaner databaseCleaner;
    private final TravelogueTestHelper testHelper;

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

    @Autowired
    public TravelogueServiceTest(
            TravelogueService travelogueService,
            DatabaseCleaner databaseCleaner,
            TravelogueTestHelper testHelper
    ) {
        this.travelogueService = travelogueService;
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
    }

    @DisplayName("여행기를 생성할 수 있다.")
    @Test
    void createTravelogue() {
        TravelogueRequest request = TravelogueTestFixture.getTravelogueRequest();
        Travelogue createdTravelogue = travelogueService.createTravelogue(request);

        assertAll(
                () -> assertThat(createdTravelogue.getId()).isEqualTo(1L),
                () -> assertThat(createdTravelogue.getTitle()).isEqualTo("낭만의 시베리아 횡단철도 여행")
        );
    }

    @DisplayName("여행기는 ID를 기준으로 조회할 수 있다.")
    @Test
    void getTravelogueById() {
        testHelper.initTravelogueTestData();

        assertDoesNotThrow(() -> travelogueService.getTravelogueById(1L));
    }

    @DisplayName("존재하지 않는 ID로 여행기를 조회하면 예외가 발생한다.")
    @Test
    void getTravelogueByNotExistsIdThrowException() {
        assertThatThrownBy(() -> travelogueService.getTravelogueById(1L))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행기입니다.");
    }

    @DisplayName("여행기를 전체 조회할 수 있다.")
    @Test
    void findAll() {
        testHelper.initTravelogueTestData();

        assertThat(travelogueService.findAll(Pageable.ofSize(BASIC_PAGE_SIZE)))
                .hasSize(1);
    }
}
