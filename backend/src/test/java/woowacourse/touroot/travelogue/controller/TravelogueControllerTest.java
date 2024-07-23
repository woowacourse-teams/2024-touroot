package woowacourse.touroot.travelogue.controller;

import static org.hamcrest.Matchers.is;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.data.domain.Page;
import woowacourse.touroot.global.AcceptanceTest;
import woowacourse.touroot.travelogue.dto.request.TravelogueRequest;
import woowacourse.touroot.travelogue.dto.response.TravelogueResponse;
import woowacourse.touroot.travelogue.fixture.TravelogueTestFixture;
import woowacourse.touroot.travelogue.helper.TravelogueTestHelper;
import woowacourse.touroot.utils.DatabaseCleaner;

@DisplayName("여행기 컨트롤러")
@AcceptanceTest
class TravelogueControllerTest {

    @LocalServerPort
    private int port;
    private final DatabaseCleaner databaseCleaner;
    private final TravelogueTestHelper testHelper;
    private final ObjectMapper objectMapper;

    @Autowired
    public TravelogueControllerTest(
            DatabaseCleaner databaseCleaner,
            TravelogueTestHelper testHelper,
            ObjectMapper objectMapper
    ) {
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
        this.objectMapper = objectMapper;
    }

    @BeforeEach
    void setUp() {
        RestAssured.port = port;

        databaseCleaner.executeTruncate();
    }

    @DisplayName("여행기를 작성한다.")
    @Test
    void createTravelogue() {
        TravelogueRequest request = TravelogueTestFixture.getTravelogueRequest();

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/travelogues")
                .then().log().all()
                .statusCode(201)
                .header("Location", "/api/v1/travelogues/1");
    }

    @DisplayName("여행기를 상세 조회한다.")
    @Test
    void findTravelogue() throws JsonProcessingException {
        testHelper.initTravelogueTestData();
        TravelogueResponse response = TravelogueTestFixture.getTravelogueResponse();

        RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .when().get("/api/v1/travelogues/1")
                .then().log().all()
                .statusCode(200).assertThat()
                .body(is(objectMapper.writeValueAsString(response)));
    }

    @DisplayName("메인 페이지 조회 시, 최신 작성 순으로 여행기를 조회한다.")
    @Test
    void findMainPageTravelogues() throws JsonProcessingException {
        testHelper.initTravelogueTestData();
        Page<TravelogueResponse> responses = TravelogueTestFixture.getTravelogueResponses();

        RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .when().get("/api/v1/travelogues")
                .then().log().all()
                .statusCode(200).assertThat()
                .body(is(objectMapper.writeValueAsString(responses)));
    }

    @DisplayName("존재하지 않는 여행기를 조회하면 예외가 발생한다.")
    @Test
    void findNotExistTravelogueThrowException() {
        RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .when().get("/api/v1/travelogues/1")
                .then().log().all()
                .statusCode(400).assertThat()
                .body("message", is("존재하지 않는 여행기입니다."));
    }
}
