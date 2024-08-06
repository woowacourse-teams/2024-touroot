package kr.touroot.travelplan.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import kr.touroot.authentication.infrastructure.JwtTokenProvider;
import kr.touroot.global.AcceptanceTest;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.dto.request.PlanDayCreateRequest;
import kr.touroot.travelplan.dto.request.PlanPlaceCreateRequest;
import kr.touroot.travelplan.dto.request.PlanPositionCreateRequest;
import kr.touroot.travelplan.dto.request.TravelPlanCreateRequest;
import kr.touroot.travelplan.helper.TravelPlanTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.Matchers.is;

@DisplayName("여행 계획 컨트롤러")
@AcceptanceTest
class TravelPlanControllerTest {

    @LocalServerPort
    private int port;
    private final ObjectMapper objectMapper;
    private final DatabaseCleaner databaseCleaner;
    private final JwtTokenProvider jwtTokenProvider;
    private final TravelPlanTestHelper testHelper;
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
        accessToken = jwtTokenProvider.createToken(member.getId());
    }

    @DisplayName("여행 계획 컨트롤러는 생성 요청이 들어올 때 200을 응답한다.")
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
        String notAuthorAccessToken = jwtTokenProvider.createToken(notAuthor.getId());

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + notAuthorAccessToken)
                .when().log().all()
                .get("/api/v1/travel-plans/" + id)
                .then().log().all()
                .statusCode(403)
                .body("message", is("여행 계획은 작성자만 조회할 수 있습니다."));
    }

    @DisplayName("여행 계획 공유 키를 통해 여행 계획을 조회할 수 있다")
    @Test
    void readTravelPlanByShareKey() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(member);
        String accessToken = jwtTokenProvider.createToken(member.getId());

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
        String notAuthorAccessToken = jwtTokenProvider.createToken(notAuthor.getId());

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
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(member);
        String accessToken = jwtTokenProvider.createToken(member.getId());

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
}
