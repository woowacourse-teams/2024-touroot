package kr.touroot.tag;

import static org.hamcrest.Matchers.is;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import kr.touroot.global.AcceptanceTest;
import kr.touroot.tag.dto.TagCreateRequest;
import kr.touroot.tag.fixture.TagFixture;
import kr.touroot.tag.helper.TagTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;

@DisplayName("태그 컨트롤러")
@AcceptanceTest
class TagControllerTest {

    private final DatabaseCleaner databaseCleaner;
    private final TagTestHelper testHelper;

    @LocalServerPort
    private int port;

    @Autowired
    public TagControllerTest(DatabaseCleaner databaseCleaner, TagTestHelper testHelper) {
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
    }

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        databaseCleaner.executeTruncate();
    }

    @DisplayName("태그 컨트롤러는 태그 생성 요청 시 201을 응답한다.")
    @Test
    void createTag() {
        // given
        TagCreateRequest request = TagFixture.TAG.getCreateRequest();

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().log().all()
                .post("/api/v1/tags")
                .then().log().all()
                .statusCode(201)
                .header("Location", is("/api/v1/tags/1"));
    }
}
