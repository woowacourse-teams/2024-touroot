package woowacourse.touroot.travelogue.controller;

import static org.hamcrest.Matchers.is;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import woowacourse.touroot.global.AcceptanceTest;
import woowacourse.touroot.utils.DatabaseCleaner;
import woowacourse.touroot.utils.TestFixture;

@AcceptanceTest
class TravelogueControllerTest {

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
        testFixture.initTravelogueTestData();
    }

    @DisplayName("여행기를 상세 조회한다.")
    @Test
    void findTravelogue() {
        RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .when().get("/api/v1/travelogues/1")
                .then().log().all()
                .statusCode(200)
                .body("title", is("여행기 1"));
    }
}
