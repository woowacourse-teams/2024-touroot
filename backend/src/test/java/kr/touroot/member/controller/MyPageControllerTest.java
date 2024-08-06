package kr.touroot.member.controller;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import kr.touroot.authentication.infrastructure.JwtTokenProvider;
import kr.touroot.global.AcceptanceTest;
import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import kr.touroot.travelplan.helper.TravelPlanTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;

import static org.hamcrest.Matchers.is;

@DisplayName("마이 페이지 컨트롤러")
@AcceptanceTest
class MyPageControllerTest {

    private final DatabaseCleaner databaseCleaner;
    private final JwtTokenProvider jwtTokenProvider;
    private final TravelogueTestHelper travelogueTestHelper;
    private final TravelPlanTestHelper travelPlanTestHelper;

    @LocalServerPort
    private int port;
    private String accessToken;
    private Member member;

    @Autowired
    public MyPageControllerTest(
            DatabaseCleaner databaseCleaner,
            JwtTokenProvider jwtTokenProvider,
            TravelogueTestHelper travelogueTestHelper,
            TravelPlanTestHelper travelPlanTestHelper
    ) {
        this.databaseCleaner = databaseCleaner;
        this.jwtTokenProvider = jwtTokenProvider;
        this.travelogueTestHelper = travelogueTestHelper;
        this.travelPlanTestHelper = travelPlanTestHelper;
    }

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        databaseCleaner.executeTruncate();

        member = travelogueTestHelper.initMemberTestData();
        accessToken = jwtTokenProvider.createToken(member.getId());
    }

    @DisplayName("마이 페이지 컨트롤러는 내 여행기 조회 요청이 들어오면 로그인한 사용자의 여행기를 조회한다.")
    @Test
    void readTravelogues() {
        // given
        travelogueTestHelper.initTravelogueTestDate(member);
        travelogueTestHelper.initTravelogueTestDate(member);
        travelogueTestHelper.initTravelogueTestData();

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().log().all()
                .get("/api/v1/member/me/travelogues")
                .then().log().all()
                .statusCode(200)
                .body("content.size()", is(2));
    }

    @DisplayName("마이 페이지 컨트롤러는 내 여행계획 조회 시 요청이 들어오면 로그인한 사용자의 여행 계획을 조회한다.")
    @Test
    void readTravelPlans() {
        // given
        travelPlanTestHelper.initTravelPlanTestData(member);
        travelPlanTestHelper.initTravelPlanTestData(member);
        travelPlanTestHelper.initTravelPlanTestData();

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().log().all()
                .get("/api/v1/member/me/travel-plans")
                .then().log().all()
                .statusCode(200)
                .body("content.size()", is(2));
    }
}
