package kr.touroot.travelplan.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import kr.touroot.authentication.infrastructure.PasswordEncryptor;
import kr.touroot.global.ServiceTest;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.config.EmbeddedS3Config;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.image.infrastructure.AwsS3Provider;
import kr.touroot.member.domain.Member;
import kr.touroot.member.service.MemberService;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.dto.request.PlanDayRequest;
import kr.touroot.travelplan.dto.request.PlanPlaceRequest;
import kr.touroot.travelplan.dto.request.PlanPositionRequest;
import kr.touroot.travelplan.dto.request.PlanRequest;
import kr.touroot.travelplan.dto.response.PlanCreateResponse;
import kr.touroot.travelplan.dto.response.PlanResponse;
import kr.touroot.travelplan.helper.TravelPlanTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

@DisplayName("여행 계획 파사드 서비스 테스트")
@Import({
        TravelPlanFacadeService.class,
        TravelPlanService.class,
        MemberService.class,
        PasswordEncryptor.class,
        TravelPlanTestHelper.class,
        AwsS3Provider.class,
        EmbeddedS3Config.class
})
@ServiceTest
class TravelPlanFacadeServiceTest {

    private final TravelPlanFacadeService travelPlanFacadeService;
    private final DatabaseCleaner databaseCleaner;
    private final TravelPlanTestHelper testHelper;

    private MemberAuth memberAuth;
    private Member author;

    @Autowired
    public TravelPlanFacadeServiceTest(
            TravelPlanFacadeService travelPlanFacadeService,
            DatabaseCleaner databaseCleaner,
            TravelPlanTestHelper testHelper
    ) {
        this.travelPlanFacadeService = travelPlanFacadeService;
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();

        author = testHelper.initMemberTestData();
        memberAuth = new MemberAuth(author.getId());
    }

    @DisplayName("여행 계획 생성 시 생성된 id를 응답한다.")
    @Test
    void createTravelPlan() {
        // given
        PlanPositionRequest locationRequest = new PlanPositionRequest("37.5175896", "127.0867236");
        PlanPlaceRequest planPlaceRequest = PlanPlaceRequest.builder()
                .placeName("잠실한강공원")
                .todos(Collections.EMPTY_LIST)
                .position(locationRequest)
                .countryCode("KR")
                .build();
        PlanDayRequest planDayRequest = new PlanDayRequest(List.of(planPlaceRequest));
        PlanRequest request = PlanRequest.builder()
                .title("신나는 한강 여행")
                .startDate(LocalDate.now().plusDays(2))
                .days(List.of(planDayRequest))
                .build();

        // when
        PlanCreateResponse actual = travelPlanFacadeService.createTravelPlan(request, memberAuth);

        // then
        assertThat(actual.id()).isEqualTo(1L);
    }

    @DisplayName("여행 계획 상세 정보를 조회할 수 있다")
    @Test
    void readTravelPlan() {
        // given
        Long id = testHelper.initTravelPlanTestData(author).getId();

        // when
        PlanResponse actual = travelPlanFacadeService.findTravelPlanById(id, memberAuth);

        // then
        assertThat(actual.id()).isEqualTo(id);
    }

    @DisplayName("공유 키로 여행 계획을 조회할 수 있다")
    @Test
    void readTravelPlanByShareKey() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(author);

        // when
        PlanResponse actual = travelPlanFacadeService.findTravelPlanByShareKey(travelPlan.getShareKey());

        // then
        assertThat(actual.shareKey()).isEqualTo(travelPlan.getShareKey());
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
                .startDate(LocalDate.now().plusDays(2))
                .days(List.of(planDayRequest))
                .build();

        // when
        PlanResponse updateResponse = travelPlanFacadeService.updateTravelPlanById(
                travelPlan.getId(),
                memberAuth,
                request
        );

        // then
        assertThat(updateResponse.title()).isEqualTo("수정된 한강 여행");
    }

    @DisplayName("여행 계획을 삭제할 수 있다")
    @Test
    void deleteTravelPlanById() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(author);

        // when
        travelPlanFacadeService.deleteTravelPlanById(travelPlan.getId(), memberAuth);

        // then
        assertThatThrownBy(() -> travelPlanFacadeService.findTravelPlanById(travelPlan.getId(), memberAuth))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 여행 계획입니다.");
    }
}
