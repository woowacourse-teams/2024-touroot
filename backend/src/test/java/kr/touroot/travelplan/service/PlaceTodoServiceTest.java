package kr.touroot.travelplan.service;

import static org.assertj.core.api.Assertions.assertThat;

import kr.touroot.global.ServiceTest;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.dto.request.TodoStatusUpdateRequest;
import kr.touroot.travelplan.dto.response.PlanPlaceTodoResponse;
import kr.touroot.travelplan.helper.TravelPlanTestHelper;
import kr.touroot.travelplan.repository.PlaceTodoRepository;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

@DisplayName("TODO 서비스")
@Import({PlaceTodoService.class, TravelPlanTestHelper.class})
@ServiceTest
class PlaceTodoServiceTest {

    private final PlaceTodoService placeTodoService;
    private final PlaceTodoRepository placeTodoRepository;
    private final DatabaseCleaner databaseCleaner;
    private final TravelPlanTestHelper testHelper;

    private MemberAuth memberAuth;
    private Member author;

    @Autowired
    public PlaceTodoServiceTest(
            PlaceTodoService placeTodoService,
            PlaceTodoRepository placeTodoRepository,
            DatabaseCleaner databaseCleaner,
            TravelPlanTestHelper testHelper
    ) {
        this.placeTodoService = placeTodoService;
        this.placeTodoRepository = placeTodoRepository;
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
        author = testHelper.initMemberTestData();
        memberAuth = new MemberAuth(author.getId());
    }

    @DisplayName("저장되어 있는 TODO의 체크 상태를 변경할 수 있다")
    @Test
    void updateTodoCheckStatus() {
        TravelPlan savedPlan = testHelper.initTravelPlanTestData(author);
        TodoStatusUpdateRequest updateRequest = new TodoStatusUpdateRequest(true);

        PlanPlaceTodoResponse updateTodoResponse = placeTodoService.updateTodoStatus(1L, memberAuth, updateRequest);

        assertThat(updateTodoResponse.checked()).isTrue();
    }
}
