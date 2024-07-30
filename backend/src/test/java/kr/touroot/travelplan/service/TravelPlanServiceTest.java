package kr.touroot.travelplan.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalDate;
import java.util.List;
import kr.touroot.global.ServiceTest;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.travelplan.dto.request.PlanDayCreateRequest;
import kr.touroot.travelplan.dto.request.PlanPlaceCreateRequest;
import kr.touroot.travelplan.dto.request.PlanPositionCreateRequest;
import kr.touroot.travelplan.dto.request.TravelPlanCreateRequest;
import kr.touroot.travelplan.dto.response.TravelPlanCreateResponse;
import kr.touroot.travelplan.dto.response.TravelPlanResponse;
import kr.touroot.travelplan.helper.TravelPlanTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

@DisplayName("여행 계획 서비스")
@Import(value = {TravelPlanService.class, TravelPlanTestHelper.class})
@ServiceTest
class TravelPlanServiceTest {

    private final TravelPlanService travelPlanService;
    private final DatabaseCleaner databaseCleaner;
    private final TravelPlanTestHelper testHelper;

    @Autowired
    public TravelPlanServiceTest(
            TravelPlanService travelPlanService,
            DatabaseCleaner databaseCleaner,
            TravelPlanTestHelper testHelper
    ) {
        this.travelPlanService = travelPlanService;
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

    @DisplayName("여행 계획 서비스는 여행 계획 생성 시 생성된 id를 응답한다.")
    @Test
    void createTravelPlan() {
        // given
        PlanPositionCreateRequest locationRequest = new PlanPositionCreateRequest("37.5175896", "127.0867236");
        PlanPlaceCreateRequest planPlaceCreateRequest = PlanPlaceCreateRequest.builder()
                .placeName("잠실한강공원")
                .description("신나는 여행 장소")
                .position(locationRequest)
                .build();
        PlanDayCreateRequest planDayCreateRequest = new PlanDayCreateRequest(List.of(planPlaceCreateRequest));
        TravelPlanCreateRequest request = TravelPlanCreateRequest.builder()
                .title("신나는 한강 여행")
                .startDate(LocalDate.MAX)
                .days(List.of(planDayCreateRequest))
                .build();

        // when
        TravelPlanCreateResponse actual = travelPlanService.createTravelPlan(request);

        // then
        assertThat(actual.id()).isEqualTo(1L);
    }

    @DisplayName("여행 계획 서비스는 지난 날짜로 여행 계획 생성 시 예외를 반환한다.")
    @Test
    void createTravelPlanWithInvalidStartDate() {
        // given
        PlanPositionCreateRequest locationRequest = new PlanPositionCreateRequest("37.5175896", "127.0867236");
        PlanPlaceCreateRequest planPlaceCreateRequest = PlanPlaceCreateRequest.builder()
                .placeName("잠실한강공원")
                .description("신나는 여행 장소")
                .position(locationRequest)
                .build();
        PlanDayCreateRequest planDayCreateRequest = new PlanDayCreateRequest(List.of(planPlaceCreateRequest));
        TravelPlanCreateRequest request = TravelPlanCreateRequest.builder()
                .title("신나는 한강 여행")
                .startDate(LocalDate.MIN)
                .days(List.of(planDayCreateRequest))
                .build();

        // when & then=
        assertThatThrownBy(() -> travelPlanService.createTravelPlan(request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("지난 날짜에 대한 계획은 작성할 수 없습니다.");
    }

    @DisplayName("여행 계획 서비스는 여행 계획 조회 시 상세 정보를 반환한다.")
    @Test
    void readTravelPlan() {
        // given
        databaseCleaner.executeTruncate();
        testHelper.initTravelPlanTestData();
        Long id = 1L;

        // when
        TravelPlanResponse actual = travelPlanService.readTravelPlan(id);

        // then
        assertThat(actual.id()).isEqualTo(id);
    }

    @DisplayName("여행 계획 서비스는 여행 계획 조회 시 상세 정보를 반환한다.")
    @Test
    void readTravelPlanWitNonExist() {
        // given
        databaseCleaner.executeTruncate();
        Long id = 1L;

        // when & then
        assertThatThrownBy(() -> travelPlanService.readTravelPlan(id))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행 계획입니다.");
    }
}
