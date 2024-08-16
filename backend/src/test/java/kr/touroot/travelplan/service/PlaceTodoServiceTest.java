package kr.touroot.travelplan.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.ServiceTest;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.config.TestQueryDslConfig;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ForbiddenException;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.dto.request.TodoStatusUpdateRequest;
import kr.touroot.travelplan.dto.response.PlanPlaceTodoResponse;
import kr.touroot.travelplan.helper.TravelPlanTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

@DisplayName("TODO 서비스")
@Import({PlaceTodoService.class, TravelPlanTestHelper.class, TestQueryDslConfig.class})
@ServiceTest
class PlaceTodoServiceTest {

    private final PlaceTodoService placeTodoService;
    private final DatabaseCleaner databaseCleaner;
    private final TravelPlanTestHelper testHelper;

    private MemberAuth memberAuth;
    private Member author;

    @Autowired
    public PlaceTodoServiceTest(
            PlaceTodoService placeTodoService,
            DatabaseCleaner databaseCleaner,
            TravelPlanTestHelper testHelper
    ) {
        this.placeTodoService = placeTodoService;
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

    @DisplayName("존재하지 않는 TODO의 체크 상태를 업데이트 하려고 할 경우 예외가 발생한다")
    @Test
    void updateNonExistTodoCheckStatus() {
        TodoStatusUpdateRequest updateRequest = new TodoStatusUpdateRequest(true);
        assertThatThrownBy(() -> placeTodoService.updateTodoStatus(1L, memberAuth, updateRequest))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 TODO 입니다");
    }

    @DisplayName("작성자가 아닌 멤버가 TODO를 업데이트하려고 하는 경우 예외가 발생한다")
    @Test
    void updateTodoCheckStatusFromNonAuthor() {
        TravelPlan savedPlan = testHelper.initTravelPlanTestData(author);
        Member notAuthor = testHelper.initMemberTestData();
        MemberAuth nonAuthorAccessor = new MemberAuth(notAuthor.getId());

        TodoStatusUpdateRequest updateRequest = new TodoStatusUpdateRequest(true);
        assertThatThrownBy(() -> placeTodoService.updateTodoStatus(1L, nonAuthorAccessor, updateRequest))
                .isInstanceOf(ForbiddenException.class)
                .hasMessage("TODO 체크는 작성자만 가능합니다");
    }
}
