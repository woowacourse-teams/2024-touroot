package kr.touroot.travelogue.controller;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import java.util.List;
import kr.touroot.authentication.infrastructure.JwtTokenProvider;
import kr.touroot.global.AcceptanceTest;
import kr.touroot.global.exception.dto.ExceptionResponse;
import kr.touroot.image.infrastructure.AwsS3Provider;
import kr.touroot.member.domain.Member;
import kr.touroot.tag.fixture.TagFixture;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.dto.response.TravelogueResponse;
import kr.touroot.travelogue.dto.response.TravelogueSimpleResponse;
import kr.touroot.travelogue.fixture.TravelogueRequestFixture;
import kr.touroot.travelogue.fixture.TravelogueResponseFixture;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;

@DisplayName("여행기 컨트롤러")
@AcceptanceTest
class TravelogueControllerTest {

    private final DatabaseCleaner databaseCleaner;
    private final TravelogueTestHelper testHelper;
    private final ObjectMapper objectMapper;
    private final JwtTokenProvider jwtTokenProvider;
    @MockBean
    private final AwsS3Provider s3Provider;

    @LocalServerPort
    private int port;
    private Member member;
    private String accessToken;

    @Autowired
    public TravelogueControllerTest(
            DatabaseCleaner databaseCleaner,
            TravelogueTestHelper testHelper,
            ObjectMapper objectMapper,
            JwtTokenProvider jwtTokenProvider,
            AwsS3Provider s3Provider
    ) {
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
        this.objectMapper = objectMapper;
        this.jwtTokenProvider = jwtTokenProvider;
        this.s3Provider = s3Provider;
    }

    @BeforeEach
    void setUp() {
        RestAssured.port = port;

        databaseCleaner.executeTruncate();

        member = testHelper.initKakaoMemberTestData();
        accessToken = jwtTokenProvider.createToken(member.getId())
                .accessToken();
    }

    @DisplayName("태그가 없는 여행기를 작성한다.")
    @Test
    void createTravelogue() {
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TravelogueResponseFixture.getTravelogueResponse().thumbnail());

        List<TravelogueDayRequest> days = getTravelogueDayRequests();
        TravelogueRequest request = TravelogueRequestFixture.getTravelogueRequest(days);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().post("/api/v1/travelogues")
                .then().log().all()
                .statusCode(201)
                .header("Location", "/api/v1/travelogues/1");
    }

    private List<TravelogueDayRequest> getTravelogueDayRequests() {
        List<TraveloguePhotoRequest> photos = TravelogueRequestFixture.getTraveloguePhotoRequests();
        List<TraveloguePlaceRequest> places = TravelogueRequestFixture.getTraveloguePlaceRequests(photos);
        return TravelogueRequestFixture.getTravelogueDayRequests(places);
    }

    @DisplayName("태그가 있는 여행기를 작성한다.")
    @Test
    void createTravelogueWithTags() {
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TravelogueResponseFixture.getTravelogueResponse().thumbnail());

        testHelper.initTagTestData();

        List<TravelogueDayRequest> days = getTravelogueDayRequests();
        TravelogueRequest request = TravelogueRequestFixture.getTravelogueRequest(days, List.of(1L));

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().post("/api/v1/travelogues")
                .then().log().all()
                .statusCode(201)
                .header("Location", "/api/v1/travelogues/1");
    }

    @DisplayName("최대 업로드 가능 개수 이상의 사진을 포함한 여행기를 작성하면 예외가 발생한다.")
    @Test
    void createTravelogueWithOver10PhotosEachPlaces() throws JsonProcessingException {
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TravelogueResponseFixture.getTravelogueResponse().thumbnail());

        List<TraveloguePhotoRequest> photos = TravelogueRequestFixture.getTraveloguePhotoRequestsOverLimit();
        List<TraveloguePlaceRequest> places = TravelogueRequestFixture.getTraveloguePlaceRequests(photos);
        List<TravelogueDayRequest> days = TravelogueRequestFixture.getTravelogueDayRequests(places);
        TravelogueRequest request = TravelogueRequestFixture.getTravelogueRequest(days);
        Member member = testHelper.initKakaoMemberTestData();
        String accessToken = jwtTokenProvider.createToken(member.getId())
                .accessToken();

        ExceptionResponse response = new ExceptionResponse("여행기 장소 사진은 최대 10개입니다.");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().post("/api/v1/travelogues")
                .then().log().all()
                .statusCode(400).assertThat()
                .body(is(objectMapper.writeValueAsString(response)));
    }

    @DisplayName("최소 여행 일자 개수를 만족하지 않은 여행기를 작성하려하면 예외가 발생한다.")
    @Test
    void createTravelogueWithNoDays() throws JsonProcessingException {
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TravelogueResponseFixture.getTravelogueResponse().thumbnail());

        TravelogueRequest request = TravelogueRequestFixture.getTravelogueRequest(List.of());

        ExceptionResponse response = new ExceptionResponse("여행기 일자는 최소 1일은 포함되어야 합니다.");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().post("/api/v1/travelogues")
                .then().log().all()
                .statusCode(400).assertThat()
                .body(is(objectMapper.writeValueAsString(response)));
    }

    @DisplayName("최소 여행 장소 개수를 만족하지 않은 여행기를 작성하려하면 예외가 발생한다.")
    @Test
    void createTravelogueWithNoPlacesDay() throws JsonProcessingException {
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TravelogueResponseFixture.getTravelogueResponse().thumbnail());

        List<TravelogueDayRequest> days = TravelogueRequestFixture.getTravelogueDayRequests(List.of());
        TravelogueRequest request = TravelogueRequestFixture.getTravelogueRequest(days);

        ExceptionResponse response = new ExceptionResponse("여행기 장소는 최소 한 곳은 포함되어야 합니다.");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().post("/api/v1/travelogues")
                .then().log().all()
                .statusCode(400).assertThat()
                .body(is(objectMapper.writeValueAsString(response)));
    }

    @DisplayName("여행기를 작성할 때 로그인 되어 있지 않으면 예외가 발생한다.")
    @Test
    void createTravelogueWithNotLoginThrowException() {
        List<TravelogueDayRequest> days = getTravelogueDayRequests();
        TravelogueRequest request = TravelogueRequestFixture.getTravelogueRequest(days);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/travelogues")
                .then().log().all()
                .statusCode(401);
    }

    @DisplayName("여행기를 상세 조회한다.")
    @Test
    void findTravelogue() throws JsonProcessingException {
        testHelper.initTravelogueTestData(member);
        TravelogueResponse response = TravelogueResponseFixture.getTravelogueResponse();

        RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .when().get("/api/v1/travelogues/1")
                .then().log().all()
                .statusCode(200).assertThat()
                .body(is(objectMapper.writeValueAsString(response)));
    }

    @DisplayName("태그가 있는 여행기를 상세 조회한다.")
    @Test
    void findTravelogueWithTags() throws JsonProcessingException {
        testHelper.initTravelogueTestDataWithTag(member);
        TravelogueResponse response = TravelogueResponseFixture.getTravelogueResponseWithTag();

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
        testHelper.initAllTravelogueTestData();
        Page<TravelogueSimpleResponse> responses = TravelogueResponseFixture.getTravelogueSimpleResponses();

        RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .when().get("/api/v1/travelogues")
                .then().log().all()
                .statusCode(200).assertThat()
                .body(is(objectMapper.writeValueAsString(responses)));
    }

    @DisplayName("메인 페이지 조회 시, 최신 작성 순으로 여행기를 조회한다.")
    @Test
    void filterMainPageTravelogues() throws JsonProcessingException {
        testHelper.initAllTravelogueTestData();
        testHelper.initTravelogueTestDataWithTag(member, List.of(TagFixture.TAG_2.get(), TagFixture.TAG_3.get()));

        RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .params("tag-filter", "2,3")
                .when().get("/api/v1/travelogues")
                .then().log().all()
                .statusCode(200).assertThat()
                .body("content.size()", is(1));
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

    @DisplayName("제목 키워드를 기준으로 여행기를 조회할 수 있다.")
    @Test
    void findTraveloguesByTitleKeyword() throws JsonProcessingException {
        testHelper.initAllTravelogueTestData();
        Page<TravelogueSimpleResponse> responses = TravelogueResponseFixture.getTravelogueSimpleResponses();

        RestAssured.given().param("keyword", "제주")
                .log().all()
                .accept(ContentType.JSON)
                .when().get("/api/v1/travelogues/search")
                .then().log().all()
                .statusCode(200).assertThat()
                .body(is(objectMapper.writeValueAsString(responses)));
    }

    @DisplayName("제목 키워드는 2글자 이상이어야 한다.")
    @ParameterizedTest
    @NullSource
    @ValueSource(strings = {"", " "})
    void findTraveloguesKeywordNotBlank(String keyword) {
        testHelper.initTravelogueTestData();

        RestAssured.given().param("keyword", keyword)
                .log().all()
                .accept(ContentType.JSON)
                .when().get("/api/v1/travelogues/search")
                .then().log().all()
                .statusCode(400).assertThat()
                .body("message", is("검색어는 2글자 이상이어야 합니다."));
    }

    @DisplayName("제목 키워드는 중간 공백 상관 없이 검색되어야 한다.")
    @ParameterizedTest
    @ValueSource(strings = {"제 주", "제주 에하영옵 서"})
    void findTraveloguesKeywordWithMiddleBlank(String keyword) throws JsonProcessingException {
        testHelper.initAllTravelogueTestData();
        Page<TravelogueSimpleResponse> responses = TravelogueResponseFixture.getTravelogueSimpleResponses();

        RestAssured.given().param("keyword", keyword)
                .log().all()
                .accept(ContentType.JSON)
                .when().get("/api/v1/travelogues/search")
                .then().log().all()
                .statusCode(200).assertThat()
                .body(is(objectMapper.writeValueAsString(responses)));
    }

    @DisplayName("여행기를 수정한다.")
    @Test
    void updateTravelogue() throws JsonProcessingException {
        Travelogue travelogue = testHelper.initTravelogueTestData(member);

        List<TravelogueDayRequest> days = getUpdateTravelogueDayRequests();
        saveImages(days);

        TravelogueRequest request = TravelogueRequestFixture.getUpdateTravelogueRequest(days);
        TravelogueResponse response = TravelogueResponseFixture.getUpdatedTravelogueResponse();

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().put("/api/v1/travelogues/" + travelogue.getId())
                .then().log().all()
                .statusCode(200)
                .body(is(objectMapper.writeValueAsString(response)));
    }

    private List<TravelogueDayRequest> getUpdateTravelogueDayRequests() {
        List<TraveloguePhotoRequest> photos = TravelogueRequestFixture.getTraveloguePhotoRequests();
        List<TraveloguePlaceRequest> places = TravelogueRequestFixture.getUpdateTraveloguePlaceRequests(photos);
        return TravelogueRequestFixture.getUpdateTravelogueDayRequests(places);
    }

    private void saveImages(List<TravelogueDayRequest> days) {
        when(s3Provider.copyImageToPermanentStorage(
                TravelogueRequestFixture.getTravelogueRequest(days).thumbnail())
        ).thenReturn(TravelogueResponseFixture.getTravelogueResponse().thumbnail());
        when(s3Provider.copyImageToPermanentStorage(
                TravelogueRequestFixture.getTraveloguePhotoRequests().get(0).url())
        ).thenReturn(TravelogueResponseFixture.getTraveloguePhotoUrls().get(0));
    }

    @DisplayName("존재하지 않는 여행기를 수정 시, 400을 응답한다.")
    @Test
    void updateTravelogueWithNotExist() {
        testHelper.initTravelogueTestData(member);
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TravelogueResponseFixture.getTravelogueResponse().thumbnail());

        List<TravelogueDayRequest> days = getTravelogueDayRequests();
        TravelogueRequest request = TravelogueRequestFixture.getUpdateTravelogueRequest(days);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().put("/api/v1/travelogues/" + 0)
                .then().log().all()
                .statusCode(400)
                .body("message", is("존재하지 않는 여행기입니다."));
    }

    @DisplayName("작성자가 아닌 사용자가 여행기 수정 시 403을 응답한다.")
    @Test
    void updateTravelogueWithNotAuthor() {
        Travelogue travelogue = testHelper.initTravelogueTestData();
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TravelogueResponseFixture.getTravelogueResponse().thumbnail());

        List<TravelogueDayRequest> days = getTravelogueDayRequests();
        TravelogueRequest request = TravelogueRequestFixture.getUpdateTravelogueRequest(days);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().put("/api/v1/travelogues/" + travelogue.getId())
                .then().log().all()
                .statusCode(403)
                .body("message", is("본인이 작성한 여행기만 수정하거나 삭제할 수 있습니다."));
    }

    @DisplayName("여행기를 삭제한다.")
    @Test
    void deleteTravelogue() {
        testHelper.initTravelogueTestData(member);

        RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().delete("/api/v1/travelogues/1")
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("존재하지 않는 여행기 삭제시 400를 응답한다.")
    @Test
    void deleteTravelogueWithNonExist() {
        RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().delete("/api/v1/travelogues/1")
                .then().log().all()
                .statusCode(400)
                .body("message", is("존재하지 않는 여행기입니다."));
    }

    @DisplayName("작성자가 아닌 사용자가 여행기 삭제시 403을 응답한다.")
    @Test
    void deleteTravelogueWithNotAuthor() {
        Travelogue travelogue = testHelper.initTravelogueTestData();
        Member notAuthor = testHelper.initKakaoMemberTestData();
        String accessToken = jwtTokenProvider.createToken(notAuthor.getId())
                .accessToken();

        RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().delete("/api/v1/travelogues/" + travelogue.getId())
                .then().log().all()
                .statusCode(403)
                .body("message", is("본인이 작성한 여행기만 수정하거나 삭제할 수 있습니다."));
    }
}
