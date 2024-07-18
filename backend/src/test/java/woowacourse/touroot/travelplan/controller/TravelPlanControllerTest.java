package woowacourse.touroot.travelplan.controller;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import woowacourse.touroot.global.AcceptanceTest;
import woowacourse.touroot.travelplan.dto.request.PlanDayCreateRequest;
import woowacourse.touroot.travelplan.dto.request.PlanLocationCreateRequest;
import woowacourse.touroot.travelplan.dto.request.PlanPlaceCreateRequest;
import woowacourse.touroot.travelplan.dto.request.TravelPlanCreateRequest;
import woowacourse.touroot.utils.DatabaseCleaner;
import woowacourse.touroot.utils.TestFixture;

import java.time.LocalDate;
import java.util.List;

import static org.hamcrest.Matchers.is;

@DisplayName("여행 계획 컨트롤러")
@AcceptanceTest
class TravelPlanControllerTest {

    @LocalServerPort
    private int port;
    @Autowired
    private DatabaseCleaner databaseCleaner;
    @Autowired
    private TestFixture testFixture;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;

        databaseCleaner.executeTruncate();
    }

    @DisplayName("여행 계획 컨트롤러는 생성 요청이 들어올 때 200을 응답한다.")
    @Test
    void createTravelPlan() {
        // given
        PlanLocationCreateRequest locationRequest = new PlanLocationCreateRequest("37.5175896", "127.0867236");
        PlanPlaceCreateRequest planPlaceCreateRequest = new PlanPlaceCreateRequest(
                "잠실한강공원",
                "신나는 여행 장소",
                0,
                locationRequest
        );
        PlanDayCreateRequest planDayCreateRequest = new PlanDayCreateRequest(0, List.of(planPlaceCreateRequest));
        TravelPlanCreateRequest request = new TravelPlanCreateRequest(
                "신나는 한강 여행",
                LocalDate.MAX,
                List.of(planDayCreateRequest)
        );

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().log().all()
                .post("/api/v1/travel-plans")
                .then().log().all()
                .statusCode(200)
                .body("id", is(1));
    }

    @DisplayName("여행 계획 컨트롤러는 지난 날짜로 생성 요청이 들어올 때 400을 응답한다.")
    @Test
    void validatePlanStartDate() {
        // given
        PlanLocationCreateRequest locationRequest = new PlanLocationCreateRequest("37.5175896", "127.0867236");
        PlanPlaceCreateRequest planPlaceCreateRequest = new PlanPlaceCreateRequest(
                "잠실한강공원",
                "신나는 여행 장소",
                0,
                locationRequest
        );
        PlanDayCreateRequest planDayCreateRequest = new PlanDayCreateRequest(0, List.of(planPlaceCreateRequest));
        TravelPlanCreateRequest request = new TravelPlanCreateRequest(
                "신나는 한강 여행",
                LocalDate.MIN,
                List.of(planDayCreateRequest)
        );

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().log().all()
                .post("/api/v1/travel-plans")
                .then().log().all()
                .statusCode(400)
                .body("message", is("지난 날짜에 대한 계획은 작성할 수 없습니다."));
    }

    @DisplayName("여행 계획 컨트롤러는 상세 조회 요청이 들어오면 200을 응답한다.")
    @Test
    void readTravelPlan() {
        // given
        testFixture.initTravelPlanTestData();
        Long id = 1L;

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().log().all()
                .get("/api/v1/travel-plans/" + id)
                .then().log().all()
                .statusCode(200)
                .body("id", is(1));
    }

    @DisplayName("여행 계획 컨트롤러는 존재하지 않는 상세 조회 요청이 들어오면 400을 응답한다.")
    @Test
    void readTravelPlanWithNonExist() {
        // given
        Long id = 1L;

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().log().all()
                .get("/api/v1/travel-plans/" + id)
                .then().log().all()
                .statusCode(400)
                .body("message", is("존재하지 않는 여행 계획입니다."));
    }
}
