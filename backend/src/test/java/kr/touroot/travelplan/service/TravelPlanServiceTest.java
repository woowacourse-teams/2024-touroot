package kr.touroot.travelplan.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import kr.touroot.global.ServiceTest;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ForbiddenException;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.dto.request.PlanDayRequest;
import kr.touroot.travelplan.dto.request.PlanPlaceRequest;
import kr.touroot.travelplan.dto.request.PlanPositionRequest;
import kr.touroot.travelplan.dto.request.PlanRequest;
import kr.touroot.travelplan.fixture.TravelPlanFixture;
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

    @DisplayName("여행 계획을 저장할 수 있다")
    @Test
    void createTravelPlan() {
        // given
        TravelPlan travelPlan = TravelPlanFixture.TRAVEL_PLAN.get(author);

        // when
        TravelPlan actual = travelPlanService.save(travelPlan);

        // then
        assertThat(actual.getId()).isEqualTo(1L);
    }

    @DisplayName("지난 날짜로 여행 계획 저장 시 예외를 반환한다.")
    @Test
    void createTravelPlanWithInvalidStartDate() {
        // given
        LocalDate past = LocalDate.now().minusDays(1);
        TravelPlan travelPlan = TravelPlanFixture.TRAVEL_PLAN.get(author, past);

        // when & then
        assertThatThrownBy(() -> travelPlanService.save(travelPlan))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("지난 날짜에 대한 계획은 작성할 수 없습니다.");
    }

    @DisplayName("당일에 시작하는 여행 계획을 생성할 수 있다")
    @Test
    void createTravelPlanStartsAtToday() {
        LocalDate today = LocalDate.now();
        TravelPlan travelPlan = TravelPlanFixture.TRAVEL_PLAN.get(author, today);

        // when & then=
        assertThatCode(() -> travelPlanService.save(travelPlan))
                .doesNotThrowAnyException();
    }

    @DisplayName("여행 계획을 가져올 수 있다")
    @Test
    void readTravelPlan() {
        // given
        Long id = testHelper.initTravelPlanTestData(author).getId();

        // when
        TravelPlan actual = travelPlanService.getTravelPlanById(id, author);

        // then
        assertThat(actual.getId()).isEqualTo(id);
    }

    @DisplayName("존재하지 않는 여행 계획을 가져오려고 할 경우 예외를 반환한다.")
    @Test
    void readTravelPlanWitNonExist() {
        // given
        Long noExistId = 1L;

        // when & then
        assertThatThrownBy(() -> travelPlanService.getTravelPlanById(noExistId, author))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행 계획입니다.");
    }

    @DisplayName("작성자가 아닌 사용자가 여행 계획을 가져오려고 하는 경우 예외를 반환한다.")
    @Test
    void readTravelPlanWithNotAuthor() {
        // given
        Long id = testHelper.initTravelPlanTestData(author).getId();
        Member notAuthor = testHelper.initMemberTestData();

        // when & then
        assertThatThrownBy(() -> travelPlanService.getTravelPlanById(id, notAuthor))
                .isInstanceOf(ForbiddenException.class)
                .hasMessage("여행 계획은 작성자만 접근 가능합니다.");
    }

    @DisplayName("새로운 정보로 여행 계획을 수정할 수 있다")
    @Test
    void updateTravelPlan() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(author);
        PlanPositionRequest locationRequest = new PlanPositionRequest("37.5175896", "127.0867236");
        PlanPlaceRequest planPlaceRequest = PlanPlaceRequest.builder()
                .placeName("잠실한강공원")
                .todos(Collections.EMPTY_LIST)
                .position(locationRequest)
                .countryCode("KR")
                .build();
        PlanDayRequest planDayRequest = new PlanDayRequest(List.of(planPlaceRequest));
        PlanRequest request = PlanRequest.builder()
                .title("수정된 한강 여행")
                .startDate(LocalDate.MAX)
                .days(List.of(planDayRequest))
                .build();

        // when
        travelPlanService.updateTravelPlan(travelPlan, author, request);
        TravelPlan updated = travelPlanService.getTravelPlanById(travelPlan.getId(), author);

        // then
        assertThat(updated.getTitle()).isEqualTo("수정된 한강 여행");
    }

    @DisplayName("작성자가 아닌 사용자가 여행 계획 수정 시도 시 예외를 반환한다.")
    @Test
    void updateTravelPlanWithNotAuthor() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(author);
        Member notAuthor = testHelper.initMemberTestData();

        PlanPositionRequest locationRequest = new PlanPositionRequest("37.5175896", "127.0867236");
        PlanPlaceRequest planPlaceRequest = PlanPlaceRequest.builder()
                .placeName("잠실한강공원")
                .todos(Collections.EMPTY_LIST)
                .position(locationRequest)
                .build();
        PlanDayRequest planDayRequest = new PlanDayRequest(List.of(planPlaceRequest));
        PlanRequest request = PlanRequest.builder()
                .title("신나는 한강 여행")
                .startDate(LocalDate.MAX)
                .days(List.of(planDayRequest))
                .build();

        // when & then
        assertThatThrownBy(() -> travelPlanService.updateTravelPlan(travelPlan, notAuthor, request))
                .isInstanceOf(ForbiddenException.class)
                .hasMessage("여행 계획은 작성자만 접근 가능합니다.");
    }

    @DisplayName("여행 계획을 삭제할 수 있다.")
    @Test
    void deleteTravelPlanById() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(author);

        // when
        travelPlanService.deleteTravelPlan(travelPlan, author);

        assertThat(travelPlanRepository.findById(travelPlan.getId()))
                .isEmpty();
    }

    @DisplayName("작성자가 아닌 사용자가 여행 계획 삭제 시 예외를 반환한다.")
    @Test
    void deleteTravelPlanWithNotAuthor() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(author);
        Member notAuthor = testHelper.initMemberTestData();

        // when & then
        assertThatThrownBy(() -> travelPlanService.deleteTravelPlan(travelPlan, notAuthor))
                .isInstanceOf(ForbiddenException.class)
                .hasMessage("여행 계획은 작성자만 접근 가능합니다.");
    }

    @DisplayName("공유 키로 여행 계획을 가져올 수 있다")
    @Test
    void readTravelPlanByShareKey() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(author);

        // when
        TravelPlan actual = travelPlanService.getTravelPlanByShareKey(travelPlan.getShareKey());

        // then
        assertThat(actual.getShareKey()).isEqualTo(travelPlan.getShareKey());
    }

    @DisplayName("여행 계획 서비스는 존재하지 않는 공유 키로 여행 계획을 조회할 경우 예외가 발생한다")
    @Test
    void readTravelPlanByInvalidShareKey() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(author);

        // when & then
        assertThatThrownBy(() -> travelPlanService.getTravelPlanByShareKey(UUID.randomUUID()))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행 계획입니다.");
    }
}
