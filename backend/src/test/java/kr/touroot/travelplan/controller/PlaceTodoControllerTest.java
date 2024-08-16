package kr.touroot.travelplan.controller;


import static org.hamcrest.Matchers.is;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import kr.touroot.authentication.infrastructure.JwtTokenProvider;
import kr.touroot.global.AcceptanceTest;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.dto.request.TodoStatusUpdateRequest;
import kr.touroot.travelplan.helper.TravelPlanTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;

@DisplayName("여행 계획 장소에 대한 TODO 컨트롤러")
@AcceptanceTest
class PlaceTodoControllerTest {

    private final ObjectMapper objectMapper;
    private final DatabaseCleaner databaseCleaner;
    private final JwtTokenProvider jwtTokenProvider;
    private final TravelPlanTestHelper testHelper;
    @LocalServerPort
    private int port;
    private String accessToken;
    private Member member;

    @Autowired
    public PlaceTodoControllerTest(ObjectMapper objectMapper, DatabaseCleaner databaseCleaner,
                                   JwtTokenProvider jwtTokenProvider, TravelPlanTestHelper testHelper) {
        this.objectMapper = objectMapper;
        this.databaseCleaner = databaseCleaner;
        this.jwtTokenProvider = jwtTokenProvider;
        this.testHelper = testHelper;
    }

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        databaseCleaner.executeTruncate();

        member = testHelper.initMemberTestData();
        accessToken = jwtTokenProvider.createToken(member.getId()).accessToken();
    }

    @DisplayName("TODO의 체크 상태를 수정할 수 있다")
    @Test
    void updateTodoStatus() {
        testHelper.initTravelPlanTestData(member);
        TodoStatusUpdateRequest todoStatusUpdateRequest = new TodoStatusUpdateRequest(true);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(todoStatusUpdateRequest)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().log().all()
                .patch("/api/v1/todos/" + 1L)
                .then().log().all()
                .statusCode(200)
                .body("checked", is(true));
    }

    @DisplayName("존재하지 않는 TODO의 체크 상태를 업데이트 하려는 경우 예외가 발생한다")
    @Test
    void updateNonExistTodoStatus() {
        TodoStatusUpdateRequest todoStatusUpdateRequest = new TodoStatusUpdateRequest(true);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(todoStatusUpdateRequest)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().log().all()
                .patch("/api/v1/todos/" + 1L)
                .then().log().all()
                .statusCode(400)
                .body("message", is("존재하지 않는 TODO 입니다"));
    }

    @DisplayName("TODO 작성자가 아닌 멤버가 TODO의 체크 상태를 업데이트 하려는 경우 예외가 발생한다.")
    @Test
    void updateTodoStatusFromNonAuthor() {
        testHelper.initTravelPlanTestData(member);

        TodoStatusUpdateRequest todoStatusUpdateRequest = new TodoStatusUpdateRequest(true);
        Member notAuthor = testHelper.initMemberTestData();
        String notAuthorAccessToken = jwtTokenProvider.createToken(notAuthor.getId())
                .accessToken();

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(todoStatusUpdateRequest)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + notAuthorAccessToken)
                .when().log().all()
                .patch("/api/v1/todos/" + 1L)
                .then().log().all()
                .statusCode(403)
                .body("message", is("TODO 체크는 작성자만 가능합니다"));
    }
}
