package kr.touroot.travelplan.controller;

import static org.hamcrest.Matchers.is;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import kr.touroot.authentication.infrastructure.JwtTokenProvider;
import kr.touroot.global.AcceptanceTest;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.dto.request.PlanDayRequest;
import kr.touroot.travelplan.dto.request.PlanPlaceRequest;
import kr.touroot.travelplan.dto.request.PlanPositionRequest;
import kr.touroot.travelplan.dto.request.PlanRequest;
import kr.touroot.travelplan.helper.TravelPlanTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;

@DisplayName("여행 계획 컨트롤러")
@AcceptanceTest
class TravelPlanControllerTest {

    private final ObjectMapper objectMapper;
    private final DatabaseCleaner databaseCleaner;
    private final JwtTokenProvider jwtTokenProvider;
    private final TravelPlanTestHelper testHelper;
    @LocalServerPort
    private int port;
    private String accessToken;
    private Member member;

    @Autowired
    public TravelPlanControllerTest(
            DatabaseCleaner databaseCleaner,
            TravelPlanTestHelper testHelper,
            JwtTokenProvider jwtTokenProvider,
            ObjectMapper objectMapper
    ) {
        this.objectMapper = objectMapper;
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        databaseCleaner.executeTruncate();

        member = testHelper.initMemberTestData();
        accessToken = jwtTokenProvider.createToken(member.getId()).accessToken();
    }

    @DisplayName("여행 계획 컨트롤러는 생성 요청이 들어올 때 200을 응답한다.")
    @Test
    void createTravelPlan() {
        // given
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
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().log().all()
                .post("/api/v1/travel-plans")
                .then().log().all()
                .statusCode(201)
                .body("id", is(1));
    }

    @DisplayName("여행 계획 컨트롤러는 지난 날짜로 생성 요청이 들어올 때 400을 응답한다.")
    @Test
    void createTravelPlanWithInvalidStartDate() {
        // given
        PlanPositionRequest locationRequest = new PlanPositionRequest("37.5175896", "127.0867236");
        PlanPlaceRequest planPlaceRequest = PlanPlaceRequest.builder()
                .placeName("잠실한강공원")
                .todos(Collections.EMPTY_LIST)
                .position(locationRequest)
                .build();
        PlanDayRequest planDayRequest = new PlanDayRequest(List.of(planPlaceRequest));
        PlanRequest request = PlanRequest.builder()
                .title("신나는 한강 여행")
                .startDate(LocalDate.MIN)
                .days(List.of(planDayRequest))
                .build();

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
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
        testHelper.initTravelPlanTestData(member);
        long id = 1L;

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
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
        long id = 1L;

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().log().all()
                .get("/api/v1/travel-plans/" + id)
                .then().log().all()
                .statusCode(400)
                .body("message", is("존재하지 않는 여행 계획입니다."));
    }

    @DisplayName("여행 계획 컨트롤러는 작성자가 아닌 사용자가 조회 시 403을 응답한다.")
    @Test
    void readTravelPlanWithNotAuthor() {
        // given
        long id = testHelper.initTravelPlanTestData(member).getId();
        Member notAuthor = testHelper.initMemberTestData();
        String notAuthorAccessToken = jwtTokenProvider.createToken(notAuthor.getId())
                .accessToken();

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + notAuthorAccessToken)
                .when().log().all()
                .get("/api/v1/travel-plans/" + id)
                .then().log().all()
                .statusCode(403)
                .body("message", is("여행 계획 조회는 작성자만 가능합니다."));
    }

    @DisplayName("여행 계획 공유 키를 통해 여행 계획을 조회할 수 있다")
    @Test
    void readTravelPlanByShareKey() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(member);

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().log().all()
                .get("/api/v1/travel-plans/shared/" + travelPlan.getShareKey())
                .then().log().all()
                .statusCode(200)
                .body("shareKey", is(travelPlan.getShareKey().toString()));
    }

    @DisplayName("공유된 여행 계획은 작성자가 아닌 회원도 조회할 수 있다")
    @Test
    void readTravelPlanByShareKeyFromNoAuthor() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(member);
        Member notAuthor = testHelper.initMemberTestData();
        String notAuthorAccessToken = jwtTokenProvider.createToken(notAuthor.getId())
                .accessToken();

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + notAuthorAccessToken)
                .when().log().all()
                .get("/api/v1/travel-plans/shared/" + travelPlan.getShareKey())
                .then().log().all()
                .statusCode(200)
                .body("shareKey", is(travelPlan.getShareKey().toString()));
    }

    @DisplayName("공유된 여행 계획은 로그인되지 않은 유저도 조회할 수 있다")
    @Test
    void readTravelPlanByNotLoginUser() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(member);
        Member notAuthor = testHelper.initMemberTestData();

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().log().all()
                .get("/api/v1/travel-plans/shared/" + travelPlan.getShareKey())
                .then().log().all()
                .statusCode(200)
                .body("shareKey", is(travelPlan.getShareKey().toString()));
    }

    @DisplayName("공유된 여행 계획을 조회할 때 존재하지 않는 공유 키로 조회할 경우 400을 응답한다")
    @Test
    void readTravelPlanByInvalidShareKey() {
        // given
        testHelper.initTravelPlanTestData(member);

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().log().all()
                .get("/api/v1/travel-plans/shared/" + UUID.randomUUID())
                .then().log().all()
                .statusCode(400)
                .body("message", is("존재하지 않는 여행 계획입니다."));
    }

    @DisplayName("여행기를 수정한다.")
    @Test
    void updateTravelPlan() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(member);
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
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().put("/api/v1/travel-plans/" + travelPlan.getId())
                .then().log().all()
                .statusCode(200)
                .body("id", is(1));
    }

    @DisplayName("존재하지 않는 여행 계획 수정시 400를 응답한다.")
    @Test
    void updateTravelPlanWithNonExist() {
        // given
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
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().put("/api/v1/travel-plans/" + 1)
                .then().log().all()
                .statusCode(400)
                .body("message", is("존재하지 않는 여행 계획입니다."));
    }

    @DisplayName("작성자가 아닌 사용자가 여행 계획 수정시 403을 응답한다.")
    @Test
    void updateTravelPlanWithNotAuthor() {
        // given
        long id = testHelper.initTravelPlanTestData(member).getId();
        Member notAuthor = testHelper.initMemberTestData();
        String notAuthorAccessToken = jwtTokenProvider.createToken(notAuthor.getId()).accessToken();
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
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + notAuthorAccessToken)
                .body(request)
                .when().put("/api/v1/travel-plans/" + id)
                .then().log().all()
                .statusCode(403)
                .body("message", is("여행 계획 수정은 작성자만 가능합니다."));
    }

    @DisplayName("여행계획을 삭제한다.")
    @Test
    void deleteTravelPlan() {
        long id = testHelper.initTravelPlanTestData(member).getId();

        RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().delete("/api/v1/travel-plans/" + id)
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("존재하지 않는 여행 계획 삭제시 400를 응답한다.")
    @Test
    void deleteTravelPlanWithNonExist() {
        long id = 1L;

        RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().delete("/api/v1/travel-plans/" + id)
                .then().log().all()
                .statusCode(400)
                .body("message", is("존재하지 않는 여행 계획입니다."));
    }

    @DisplayName("작성자가 아닌 사용자가 여행 계획 삭제시 403을 응답한다.")
    @Test
    void deleteTravelPlanWithNotAuthor() {
        long id = testHelper.initTravelPlanTestData(member).getId();
        Member notAuthor = testHelper.initMemberTestData();
        String notAuthorAccessToken = jwtTokenProvider.createToken(notAuthor.getId()).accessToken();

        RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + notAuthorAccessToken)
                .when().delete("/api/v1/travel-plans/" + id)
                .then().log().all()
                .statusCode(403)
                .body("message", is("여행 계획 삭제는 작성자만 가능합니다."));
    }
}
