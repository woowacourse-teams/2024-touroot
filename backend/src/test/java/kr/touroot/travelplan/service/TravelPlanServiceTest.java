package kr.touroot.travelplan.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import kr.touroot.global.ServiceTest;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ForbiddenException;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.dto.request.PlanDayCreateRequest;
import kr.touroot.travelplan.dto.request.PlanPlaceCreateRequest;
import kr.touroot.travelplan.dto.request.PlanPositionCreateRequest;
import kr.touroot.travelplan.dto.request.TravelPlanCreateRequest;
import kr.touroot.travelplan.dto.response.TravelPlanCreateResponse;
import kr.touroot.travelplan.dto.response.TravelPlanResponse;
import kr.touroot.travelplan.helper.TravelPlanTestHelper;
import kr.touroot.travelplan.repository.TravelPlanRepository;
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
    private final TravelPlanRepository travelPlanRepository;
    private final DatabaseCleaner databaseCleaner;
    private final TravelPlanTestHelper testHelper;

    private MemberAuth memberAuth;
    private Member author;

    @Autowired
    public TravelPlanServiceTest(
            TravelPlanService travelPlanService,
            TravelPlanRepository travelPlanRepository,
            DatabaseCleaner databaseCleaner,
            TravelPlanTestHelper testHelper
    ) {
        this.travelPlanService = travelPlanService;
        this.travelPlanRepository = travelPlanRepository;
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();

        author = testHelper.initMemberTestData();
        memberAuth = new MemberAuth(author.getId());
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
        TravelPlanCreateResponse actual = travelPlanService.createTravelPlan(request, memberAuth);

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
        assertThatThrownBy(() -> travelPlanService.createTravelPlan(request, memberAuth))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("지난 날짜에 대한 계획은 작성할 수 없습니다.");
    }

    @DisplayName("당일에 시작하는 여행 계획을 생성할 수 있다")
    @Test
    void createTravelPlanStartsAtToday() {
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
                .startDate(LocalDate.now())
                .days(List.of(planDayCreateRequest))
                .build();

        // when & then=
        assertThatCode(() -> travelPlanService.createTravelPlan(request, memberAuth))
                .doesNotThrowAnyException();
    }

    @DisplayName("여행 계획 서비스는 여행 계획 조회 시 상세 정보를 반환한다.")
    @Test
    void readTravelPlan() {
        // given
        Long id = testHelper.initTravelPlanTestData(author).getId();

        // when
        TravelPlanResponse actual = travelPlanService.readTravelPlan(id, memberAuth);

        // then
        assertThat(actual.id()).isEqualTo(id);
    }

    @DisplayName("여행 계획 서비스는 존재하지 않는 여행 계획 조회 시 예외를 반환한다.")
    @Test
    void readTravelPlanWitNonExist() {
        // given
        databaseCleaner.executeTruncate();
        Long id = 1L;

        // when & then
        assertThatThrownBy(() -> travelPlanService.readTravelPlan(id, memberAuth))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행 계획입니다.");
    }

    @DisplayName("여행 계획 서비스는 작성자가 아닌 사용자가 조회 시 예외를 반환한다.")
    @Test
    void readTravelPlanWithNotAuthor() {
        // given
        Long id = testHelper.initTravelPlanTestData(author).getId();
        MemberAuth notAuthor = new MemberAuth(testHelper.initMemberTestData().getId());

        // when & then
        assertThatThrownBy(() -> travelPlanService.readTravelPlan(id, notAuthor))
                .isInstanceOf(ForbiddenException.class)
                .hasMessage("여행 계획 조회는 작성자만 가능합니다.");
    }

    @DisplayName("여행 계획 서비스는 여행 계획 일자를 계산해 반환한다.")
    @Test
    void calculateTravelPeriod() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(author);

        // when
        int actual = travelPlanService.calculateTravelPeriod(travelPlan);

        // then
        assertThat(actual).isEqualTo(1);
    }

    @DisplayName("여행계획을 ID 기준으로 삭제할 수 있다.")
    @Test
    void deleteTravelPlanById() {
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(author);
        travelPlanService.deleteByTravelPlanId(travelPlan.getId(), memberAuth);

        assertThat(travelPlanRepository.findById(travelPlan.getId()))
                .isEmpty();
    }

    @DisplayName("여행 계획 서비스는 존재하지 않는 여행 계획 삭제 시 예외를 반환한다.")
    @Test
    void deleteTravelPlanWitNonExist() {
        // given
        databaseCleaner.executeTruncate();
        Long id = 1L;

        // when & then
        assertThatThrownBy(() -> travelPlanService.deleteByTravelPlanId(id, memberAuth))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행 계획입니다.");
    }

    @DisplayName("여행 계획 서비스는 작성자가 아닌 사용자가 삭제 시 예외를 반환한다.")
    @Test
    void deleteTravelPlanWithNotAuthor() {
        // given
        Long id = testHelper.initTravelPlanTestData(author).getId();
        MemberAuth notAuthor = new MemberAuth(testHelper.initMemberTestData().getId());

        // when & then
        assertThatThrownBy(() -> travelPlanService.deleteByTravelPlanId(id, notAuthor))
                .isInstanceOf(ForbiddenException.class)
                .hasMessage("여행 계획 삭제는 작성자만 가능합니다.");
    }

    @DisplayName("여행 계획 서비스는 공유 키로 여행 계획을 조회할 수 있다")
    @Test
    void readTravelPlanByShareKey() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(author);

        // when
        TravelPlanResponse actual = travelPlanService.readTravelPlan(travelPlan.getShareKey());

        // then
        assertThat(actual.shareKey()).isEqualTo(travelPlan.getShareKey());
    }

    @DisplayName("여행 계획 서비스는 존재하지 않는 공유 키로 여행 계획을 조회할 경우 예외가 발생한다")
    @Test
    void readTravelPlanByInvalidShareKey() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(author);

        // when & then
        assertThatThrownBy(() -> travelPlanService.readTravelPlan(UUID.randomUUID()))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행 계획입니다.");
    }
}
