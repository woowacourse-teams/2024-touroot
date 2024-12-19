package kr.touroot.travelplan.controller;

import static kr.touroot.travelplan.fixture.TravelPlaceTodoFixture.BUY_LOCAL_SNACKS;
import static kr.touroot.travelplan.fixture.TravelPlaceTodoFixture.BUY_SOUVENIRS;
import static kr.touroot.travelplan.fixture.TravelPlaceTodoFixture.ENJOY_SUNSET;
import static kr.touroot.travelplan.fixture.TravelPlaceTodoFixture.EXPLORE_ON_FOOT;
import static kr.touroot.travelplan.fixture.TravelPlaceTodoFixture.RELAX_IN_CAFE;
import static kr.touroot.travelplan.fixture.TravelPlaceTodoFixture.TAKE_PHOTOS;
import static kr.touroot.travelplan.fixture.TravelPlanDayFixture.FIRST_DAY;
import static kr.touroot.travelplan.fixture.TravelPlanDayFixture.SECOND_DAY;
import static kr.touroot.travelplan.fixture.TravelPlanFixture.JEJU_TRAVEL_PLAN;
import static kr.touroot.travelplan.fixture.TravelPlanFixture.PAST_DATE_TRAVEL_PLAN;
import static kr.touroot.travelplan.fixture.TravelPlanPlaceFixture.HAMDEOK_BEACH;
import static kr.touroot.travelplan.fixture.TravelPlanPlaceFixture.MANJANG_CAVE;
import static kr.touroot.travelplan.fixture.TravelPlanPlaceFixture.SEONGSAN_ILCHULBONG;
import static org.hamcrest.Matchers.is;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import java.util.List;
import java.util.UUID;
import kr.touroot.authentication.infrastructure.JwtTokenProvider;
import kr.touroot.global.AcceptanceTest;
import kr.touroot.global.IntegrationTest;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.dto.request.PlanRequest;
import kr.touroot.travelplan.helper.TravelPlanRequestBuilder;
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
class TravelPlanControllerTest extends IntegrationTest {

    private final DatabaseCleaner databaseCleaner;
    private final JwtTokenProvider jwtTokenProvider;
    private final TravelPlanTestHelper testHelper;
    @LocalServerPort
    private int port;
    private String accessToken;
    private Member planWriter;

    @Autowired
    public TravelPlanControllerTest(
            DatabaseCleaner databaseCleaner,
            TravelPlanTestHelper testHelper,
            JwtTokenProvider jwtTokenProvider
    ) {
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        databaseCleaner.executeTruncate();

        planWriter = testHelper.initMemberTestData();
        accessToken = jwtTokenProvider.createToken(planWriter.getId()).accessToken();
    }

    @DisplayName("여행 계획 컨트롤러는 생성 요청이 들어올 때 201을 응답한다.")
    @Test
    void createTravelPlan() {
        // given
        PlanRequest request = TravelPlanRequestBuilder.forTravelPlan(JEJU_TRAVEL_PLAN)
                .addDay(FIRST_DAY)
                .addPlanPlaceWithTodos(HAMDEOK_BEACH, List.of(RELAX_IN_CAFE, BUY_LOCAL_SNACKS))
                .addPlanPlaceWithTodos(MANJANG_CAVE, List.of(BUY_SOUVENIRS, TAKE_PHOTOS))
                .buildDay()
                .addDay(SECOND_DAY)
                .addPlanPlaceWithTodos(SEONGSAN_ILCHULBONG, List.of(ENJOY_SUNSET, EXPLORE_ON_FOOT))
                .buildDay()
                .build();

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().log().all()
                .post("/api/v1/travel-plans")
                .then().log().all()
                .headers("Location", "/api/v1/travel-plans/1")
                .statusCode(201);
    }

    @DisplayName("여행 계획 컨트롤러는 지난 날짜로 생성 요청이 들어올 때 400을 응답한다.")
    @Test
    void createTravelPlanWithInvalidStartDate() {
        // given
        PlanRequest request = TravelPlanRequestBuilder.forTravelPlan(PAST_DATE_TRAVEL_PLAN)
                .addDay(FIRST_DAY)
                .addPlanPlaceWithTodos(HAMDEOK_BEACH, List.of(RELAX_IN_CAFE, BUY_LOCAL_SNACKS))
                .addPlanPlaceWithTodos(MANJANG_CAVE, List.of(BUY_SOUVENIRS, TAKE_PHOTOS))
                .buildDay()
                .addDay(SECOND_DAY)
                .addPlanPlaceWithTodos(SEONGSAN_ILCHULBONG, List.of(ENJOY_SUNSET, EXPLORE_ON_FOOT))
                .buildDay()
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
        TravelPlan savedTravelPlan = testHelper.initTravelPlanTestData(planWriter);

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().log().all()
                .get("/api/v1/travel-plans/" + savedTravelPlan.getId())
                .then().log().all()
                .statusCode(200)
                .body("id", is(1));
    }

    @DisplayName("여행 계획 컨트롤러는 존재하지 않는 상세 조회 요청이 들어오면 400을 응답한다.")
    @Test
    void readTravelPlanWithNonExist() {
        // given
        long noExistingId = 1L;

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().log().all()
                .get("/api/v1/travel-plans/" + noExistingId)
                .then().log().all()
                .statusCode(400)
                .body("message", is("존재하지 않는 여행 계획입니다."));
    }

    @DisplayName("여행 계획 컨트롤러는 작성자가 아닌 사용자가 조회 시 403을 응답한다.")
    @Test
    void readTravelPlanWithNotAuthor() {
        // given
        long id = testHelper.initTravelPlanTestData(planWriter).getId();
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
                .body("message", is("여행 계획은 작성자만 접근 가능합니다."));
    }

    @DisplayName("여행 계획 공유 키를 통해 여행 계획을 조회할 수 있다")
    @Test
    void readTravelPlanByShareKey() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(planWriter);

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
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(planWriter);
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
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(planWriter);
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
        testHelper.initTravelPlanTestData(planWriter);

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

    @DisplayName("여행계획을 수정한다.")
    @Test
    void updateTravelPlan() {
        // given
        TravelPlan travelPlan = testHelper.initTravelPlanTestData(planWriter);

        PlanRequest request = TravelPlanRequestBuilder.forTravelPlan(PAST_DATE_TRAVEL_PLAN)
                .addDay(FIRST_DAY)
                .addPlanPlaceWithTodos(HAMDEOK_BEACH, List.of(RELAX_IN_CAFE, BUY_LOCAL_SNACKS))
                .addPlanPlaceWithTodos(MANJANG_CAVE, List.of(BUY_SOUVENIRS, TAKE_PHOTOS))
                .buildDay()
                .addDay(SECOND_DAY)
                .addPlanPlaceWithTodos(SEONGSAN_ILCHULBONG, List.of(ENJOY_SUNSET, EXPLORE_ON_FOOT))
                .buildDay()
                .build();

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().put("/api/v1/travel-plans/" + travelPlan.getId())
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("존재하지 않는 여행 계획 수정시 400를 응답한다.")
    @Test
    void updateTravelPlanWithNonExist() {
        // given
        PlanRequest request = TravelPlanRequestBuilder.forTravelPlan(PAST_DATE_TRAVEL_PLAN)
                .addDay(FIRST_DAY)
                .addPlanPlaceWithTodos(HAMDEOK_BEACH, List.of(RELAX_IN_CAFE, BUY_LOCAL_SNACKS))
                .addPlanPlaceWithTodos(MANJANG_CAVE, List.of(BUY_SOUVENIRS, TAKE_PHOTOS))
                .buildDay()
                .addDay(SECOND_DAY)
                .addPlanPlaceWithTodos(SEONGSAN_ILCHULBONG, List.of(ENJOY_SUNSET, EXPLORE_ON_FOOT))
                .buildDay()
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
        long id = testHelper.initTravelPlanTestData(planWriter).getId();
        Member notAuthor = testHelper.initMemberTestData();

        String notAuthorAccessToken = jwtTokenProvider.createToken(notAuthor.getId()).accessToken();
        PlanRequest request = TravelPlanRequestBuilder.forTravelPlan(PAST_DATE_TRAVEL_PLAN)
                .addDay(FIRST_DAY)
                .addPlanPlaceWithTodos(HAMDEOK_BEACH, List.of(RELAX_IN_CAFE, BUY_LOCAL_SNACKS))
                .addPlanPlaceWithTodos(MANJANG_CAVE, List.of(BUY_SOUVENIRS, TAKE_PHOTOS))
                .buildDay()
                .addDay(SECOND_DAY)
                .addPlanPlaceWithTodos(SEONGSAN_ILCHULBONG, List.of(ENJOY_SUNSET, EXPLORE_ON_FOOT))
                .buildDay()
                .build();

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + notAuthorAccessToken)
                .body(request)
                .when().put("/api/v1/travel-plans/" + id)
                .then().log().all()
                .statusCode(403)
                .body("message", is("여행 계획은 작성자만 접근 가능합니다."));
    }

    @DisplayName("여행계획을 삭제한다.")
    @Test
    void deleteTravelPlan() {
        long id = testHelper.initTravelPlanTestData(planWriter).getId();

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
        long id = testHelper.initTravelPlanTestData(planWriter).getId();
        Member notAuthor = testHelper.initMemberTestData();
        String notAuthorAccessToken = jwtTokenProvider.createToken(notAuthor.getId()).accessToken();

        RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + notAuthorAccessToken)
                .when().delete("/api/v1/travel-plans/" + id)
                .then().log().all()
                .statusCode(403)
                .body("message", is("여행 계획은 작성자만 접근 가능합니다."));
    }
}
