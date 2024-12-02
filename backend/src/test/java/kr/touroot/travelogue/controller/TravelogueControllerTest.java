package kr.touroot.travelogue.controller;

import static kr.touroot.travelogue.fixture.TravelogueDayFixture.FIRST_DAY;
import static kr.touroot.travelogue.fixture.TravelogueDayFixture.SECOND_DAY;
import static kr.touroot.travelogue.fixture.TravelogueFixture.JEJU_TRAVELOGUE;
import static kr.touroot.travelogue.fixture.TraveloguePhotoFixture.TRAVELOGUE_PHOTO_1;
import static kr.touroot.travelogue.fixture.TraveloguePhotoFixture.TRAVELOGUE_PHOTO_10;
import static kr.touroot.travelogue.fixture.TraveloguePhotoFixture.TRAVELOGUE_PHOTO_11;
import static kr.touroot.travelogue.fixture.TraveloguePhotoFixture.TRAVELOGUE_PHOTO_2;
import static kr.touroot.travelogue.fixture.TraveloguePhotoFixture.TRAVELOGUE_PHOTO_3;
import static kr.touroot.travelogue.fixture.TraveloguePhotoFixture.TRAVELOGUE_PHOTO_4;
import static kr.touroot.travelogue.fixture.TraveloguePhotoFixture.TRAVELOGUE_PHOTO_5;
import static kr.touroot.travelogue.fixture.TraveloguePhotoFixture.TRAVELOGUE_PHOTO_6;
import static kr.touroot.travelogue.fixture.TraveloguePhotoFixture.TRAVELOGUE_PHOTO_7;
import static kr.touroot.travelogue.fixture.TraveloguePhotoFixture.TRAVELOGUE_PHOTO_8;
import static kr.touroot.travelogue.fixture.TraveloguePhotoFixture.TRAVELOGUE_PHOTO_9;
import static kr.touroot.travelogue.fixture.TraveloguePlaceFixture.HAMDEOK_BEACH;
import static kr.touroot.travelogue.fixture.TraveloguePlaceFixture.JEJU_FOLK_VILLAGE;
import static kr.touroot.travelogue.fixture.TraveloguePlaceFixture.MANJANG_CAVE;
import static kr.touroot.travelogue.fixture.TraveloguePlaceFixture.SEONGSAN_ILCHULBONG;
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
import kr.touroot.travelogue.dto.response.TravelogueLikeResponse;
import kr.touroot.travelogue.dto.response.TravelogueResponse;
import kr.touroot.travelogue.dto.response.TravelogueSimpleResponse;
import kr.touroot.travelogue.fixture.TravelogueRequestFixture;
import kr.touroot.travelogue.fixture.TravelogueResponseFixture;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
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

        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TRAVELOGUE_PHOTO_1.getUrl());
    }

    @DisplayName("태그가 없는 여행기를 작성한다.")
    @Test
    void createTravelogue() {
        TravelogueRequest requestWithNoTags = JEJU_TRAVELOGUE.getCreateRequestWith(
                FIRST_DAY.getCreateRequestWith(
                        HAMDEOK_BEACH.getCreateRequestWith(TRAVELOGUE_PHOTO_1.getCreateRequest()),
                        SEONGSAN_ILCHULBONG.getCreateRequestWith(TRAVELOGUE_PHOTO_2.getCreateRequest())
                ),
                SECOND_DAY.getCreateRequestWith(
                        JEJU_FOLK_VILLAGE.getCreateRequestWith(TRAVELOGUE_PHOTO_3.getCreateRequest()),
                        MANJANG_CAVE.getCreateRequestWith(TRAVELOGUE_PHOTO_4.getCreateRequest())
                )
        );

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(requestWithNoTags)
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
        testHelper.initTagTestData();

        TravelogueRequest requestWithTag = JEJU_TRAVELOGUE.getCreateRequestWith(
                List.of(1L),
                FIRST_DAY.getCreateRequestWith(
                        HAMDEOK_BEACH.getCreateRequestWith(TRAVELOGUE_PHOTO_1.getCreateRequest()),
                        SEONGSAN_ILCHULBONG.getCreateRequestWith(TRAVELOGUE_PHOTO_2.getCreateRequest())
                ),
                SECOND_DAY.getCreateRequestWith(
                        JEJU_FOLK_VILLAGE.getCreateRequestWith(TRAVELOGUE_PHOTO_3.getCreateRequest()),
                        MANJANG_CAVE.getCreateRequestWith(TRAVELOGUE_PHOTO_4.getCreateRequest())
                )
        );

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(requestWithTag)
                .when().post("/api/v1/travelogues")
                .then().log().all()
                .statusCode(201)
                .header("Location", "/api/v1/travelogues/1");
    }

    @DisplayName("최대 업로드 가능 개수 이상의 사진을 포함한 여행기를 작성하면 예외가 발생한다.")
    @Test
    void createTravelogueWithOver10PhotosEachPlaces() throws JsonProcessingException {
        TravelogueRequest requestContainsExceedingPhotoCountPlace = JEJU_TRAVELOGUE.getCreateRequestWith(
                FIRST_DAY.getCreateRequestWith(
                        HAMDEOK_BEACH.getCreateRequestWith(
                                TRAVELOGUE_PHOTO_1.getCreateRequest(),
                                TRAVELOGUE_PHOTO_2.getCreateRequest(),
                                TRAVELOGUE_PHOTO_3.getCreateRequest(),
                                TRAVELOGUE_PHOTO_4.getCreateRequest(),
                                TRAVELOGUE_PHOTO_5.getCreateRequest(),
                                TRAVELOGUE_PHOTO_6.getCreateRequest(),
                                TRAVELOGUE_PHOTO_7.getCreateRequest(),
                                TRAVELOGUE_PHOTO_8.getCreateRequest(),
                                TRAVELOGUE_PHOTO_9.getCreateRequest(),
                                TRAVELOGUE_PHOTO_10.getCreateRequest(),
                                TRAVELOGUE_PHOTO_11.getCreateRequest()),
                        SEONGSAN_ILCHULBONG.getCreateRequestWith(TRAVELOGUE_PHOTO_2.getCreateRequest())
                ),
                SECOND_DAY.getCreateRequestWith(
                        JEJU_FOLK_VILLAGE.getCreateRequestWith(TRAVELOGUE_PHOTO_3.getCreateRequest()),
                        MANJANG_CAVE.getCreateRequestWith(TRAVELOGUE_PHOTO_4.getCreateRequest())
                )
        );

        ExceptionResponse response = new ExceptionResponse("여행기 장소 사진은 최대 10개입니다.");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(requestContainsExceedingPhotoCountPlace)
                .when().post("/api/v1/travelogues")
                .then().log().all()
                .statusCode(400).assertThat()
                .body(is(objectMapper.writeValueAsString(response)));
    }

    @DisplayName("최소 여행 일자 개수를 만족하지 않은 여행기를 작성하려하면 예외가 발생한다.")
    @Test
    void createTravelogueWithNoDays() throws JsonProcessingException {
        TravelogueRequest travelogueWithNoDays = JEJU_TRAVELOGUE.getCreateRequestWith();

        ExceptionResponse response = new ExceptionResponse("여행기 일자는 최소 1일은 포함되어야 합니다.");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(travelogueWithNoDays)
                .when().post("/api/v1/travelogues")
                .then().log().all()
                .statusCode(400).assertThat()
                .body(is(objectMapper.writeValueAsString(response)));
    }

    @DisplayName("최소 여행 장소 개수를 만족하지 않은 여행기를 작성하려하면 예외가 발생한다.")
    @Test
    void createTravelogueWithNoPlacesDay() throws JsonProcessingException {
        TravelogueRequest requestContainsNoPlacesDay = JEJU_TRAVELOGUE.getCreateRequestWith(
                List.of(1L),
                FIRST_DAY.getCreateRequestWith(),
                SECOND_DAY.getCreateRequestWith(
                        JEJU_FOLK_VILLAGE.getCreateRequestWith(TRAVELOGUE_PHOTO_3.getCreateRequest()),
                        MANJANG_CAVE.getCreateRequestWith(TRAVELOGUE_PHOTO_4.getCreateRequest())
                )
        );

        ExceptionResponse response = new ExceptionResponse("여행기 장소는 최소 한 곳은 포함되어야 합니다.");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(requestContainsNoPlacesDay)
                .when().post("/api/v1/travelogues")
                .then().log().all()
                .statusCode(400).assertThat()
                .body(is(objectMapper.writeValueAsString(response)));
    }

    @DisplayName("여행기를 작성할 때 로그인 되어 있지 않으면 예외가 발생한다.")
    @Test
    void createTravelogueWithNotLoginThrowException() {
        TravelogueRequest jejuTravelogueRequest = JEJU_TRAVELOGUE.getCreateRequestWith(
                FIRST_DAY.getCreateRequestWith(
                        HAMDEOK_BEACH.getCreateRequestWith(TRAVELOGUE_PHOTO_1.getCreateRequest()),
                        SEONGSAN_ILCHULBONG.getCreateRequestWith(TRAVELOGUE_PHOTO_2.getCreateRequest())
                ),
                SECOND_DAY.getCreateRequestWith(
                        JEJU_FOLK_VILLAGE.getCreateRequestWith(TRAVELOGUE_PHOTO_3.getCreateRequest()),
                        MANJANG_CAVE.getCreateRequestWith(TRAVELOGUE_PHOTO_4.getCreateRequest())
                )
        );

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(jejuTravelogueRequest)
                .when().post("/api/v1/travelogues")
                .then().log().all()
                .statusCode(401)
                .body("message", is("로그인을 해주세요."));
    }

    @DisplayName("여행기에 좋아요를 한다.")
    @Test
    void likeTravelogue() throws JsonProcessingException {
        Member author = testHelper.initKakaoMemberTestData();
        Travelogue travelogue = testHelper.initTravelogueTestData(author);
        TravelogueLikeResponse response = new TravelogueLikeResponse(true, 1L);

        RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post("/api/v1/travelogues/" + travelogue.getId() + "/like")
                .then().log().all()
                .statusCode(200).assertThat()
                .body(is(objectMapper.writeValueAsString(response)));
    }

    @DisplayName("존재하지 않는 여행기에 좋아요를 하면 예외가 발생한다.")
    @Test
    void likeTravelogueWithNotExistThrowException() throws JsonProcessingException {
        RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().post("/api/v1/travelogues/1/like")
                .then().log().all()
                .statusCode(400).assertThat()
                .body("message", is("존재하지 않는 여행기입니다."));
    }

    @DisplayName("여행기를 좋아요 할 때 로그인 되어 있지 않으면 예외가 발생한다.")
    @Test
    void likeTravelogueWithNotLoginThrowException() {
        Member author = testHelper.initKakaoMemberTestData();
        Travelogue travelogue = testHelper.initTravelogueTestData(author);

        RestAssured.given().log().all()
                .when().post("/api/v1/travelogues/" + travelogue.getId() + "/like")
                .then().log().all()
                .statusCode(401)
                .body("message", is("로그인을 해주세요."));
    }

    //mark
    @DisplayName("여행기를 상세 조회한다.")
    @Test
    void findTravelogue() throws JsonProcessingException {
        Travelogue travelogue = testHelper.initTravelogueTestData(member);
        TravelogueResponse response = TravelogueResponseFixture.getTravelogueResponse();

        RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .when().get("/api/v1/travelogues/1")
                .then().log().all()
                .statusCode(200).assertThat()
                .body(is(objectMapper.writeValueAsString(response)));
    }

    @DisplayName("여행기에 좋아요를 누른 사용자가 여행기를 상세 조회한다.")
    @Test
    void findTravelogueWithLike() throws JsonProcessingException {
        testHelper.initTravelogueTestDataWithLike(member);
        TravelogueResponse response = TravelogueResponseFixture.getTravelogueResponseWithLike();

        RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
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

    @DisplayName("메인 페이지 조회 시, 좋아요 순으로 여행기를 조회한다.")
    @Test
    void findMainPageTraveloguesOrderByLikeCount() throws JsonProcessingException {
        testHelper.initAllTravelogueTestData();
        Page<TravelogueSimpleResponse> responses = TravelogueResponseFixture.getTravelogueSimpleResponsesOrderByLikeCount();

        RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .params("sort", "likeCount,desc")
                .when().get("/api/v1/travelogues")
                .then().log().all()
                .statusCode(200).assertThat()
                .body(is(objectMapper.writeValueAsString(responses)));
    }

    @DisplayName("메인 페이지 조회 시 태그 기반으로 필터링을 진행한다.")
    @Test
    void filterMainPageTraveloguesWithTag() {
        testHelper.initAllTravelogueTestData();
        testHelper.initTravelogueTestDataWithTag(member, List.of(TagFixture.TAG_2.get(), TagFixture.TAG_3.get()));

        RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .params("tag", "2,3")
                .when().get("/api/v1/travelogues")
                .then().log().all()
                .statusCode(200).assertThat()
                .body("content.size()", is(1));
    }

    @DisplayName("메인 페이지 조회 시 날짜 기반으로 필터링을 진행한다.")
    @Test
    void filterMainPageTraveloguesWithPeriod() {
        testHelper.initAllTravelogueTestData();
        testHelper.initTravelogueTestDataWithTag(member, List.of(TagFixture.TAG_2.get(), TagFixture.TAG_3.get()));

        RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .params("period", "1")
                .when().get("/api/v1/travelogues")
                .then().log().all()
                .statusCode(200).assertThat()
                .body("content.size()", is(3));
    }

    @DisplayName("메인 페이지 조회 시 날짜 및 태그 기반으로 필터링을 진행한다.")
    @Test
    void filterMainPageTraveloguesWithPeriodAndTag() {
        testHelper.initAllTravelogueTestData();
        testHelper.initTravelogueTestDataWithTag(member, List.of(TagFixture.TAG_2.get(), TagFixture.TAG_3.get()));

        RestAssured.given().log().all()
                .accept(ContentType.JSON)
                .params("tag", "1")
                .params("period", "1")
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

        RestAssured.given()
                .param("keyword", "제주")
                .param("searchType", "TITLE")
                .log().all()
                .accept(ContentType.JSON)
                .when().get("/api/v1/travelogues")
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

        RestAssured.given()
                .param("keyword", keyword)
                .param("searchType", "TITLE")
                .log().all()
                .accept(ContentType.JSON)
                .when().get("/api/v1/travelogues")
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

        RestAssured.given()
                .param("keyword", keyword)
                .param("searchType", "TITLE")
                .log().all()
                .accept(ContentType.JSON)
                .when().get("/api/v1/travelogues")
                .then().log().all()
                .statusCode(200).assertThat()
                .body(is(objectMapper.writeValueAsString(responses)));
    }

    @Disabled // 검색과 필터링 API 통합으로 검색 키워드 빈 값 가능
    @DisplayName("검색 키워드의 종류를 명시해야 한다.")
    @Test
    void findTraveloguesByKeywordWithoutSearchType() {
        testHelper.initAllTravelogueTestData();

        RestAssured.given()
                .param("keyword", "제주")
                .log().all()
                .accept(ContentType.JSON)
                .when().get("/api/v1/travelogues/search")
                .then().log().all()
                .statusCode(400).assertThat()
                .body("message", is("검색 키워드 종류는 필수입니다."));
    }

    @DisplayName("여행기를 수정한다.")
    @Test
    void updateTravelogue() {
        Mockito.when(s3Provider.copyImageToPermanentStorage(any(String.class)))
                .thenReturn(TravelogueResponseFixture.getUpdatedTravelogueResponse().thumbnail());

        Travelogue travelogue = testHelper.initTravelogueTestData(member);

        List<TravelogueDayRequest> days = getUpdateTravelogueDayRequests();
        saveImages(days);

        TravelogueRequest request = TravelogueRequestFixture.getUpdateTravelogueRequest(days);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().put("/api/v1/travelogues/" + travelogue.getId())
                .then().log().all()
                .statusCode(200);
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

    @DisplayName("여행기에 좋아요 취소를 한다.")
    @Test
    void unlikeTravelogue() throws JsonProcessingException {
        Travelogue travelogue = testHelper.initTravelogueTestDataWithLike(member);
        TravelogueLikeResponse response = new TravelogueLikeResponse(false, 0L);

        RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().delete("/api/v1/travelogues/" + travelogue.getId() + "/like")
                .then().log().all()
                .statusCode(200).assertThat()
                .body(is(objectMapper.writeValueAsString(response)));
    }

    @DisplayName("존재하지 않는 여행기에 좋아요 취소를 하면 예외가 발생한다.")
    @Test
    void unlikeTravelogueWithNotExistThrowException() throws JsonProcessingException {
        RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when().delete("/api/v1/travelogues/1/like")
                .then().log().all()
                .statusCode(400).assertThat()
                .body("message", is("존재하지 않는 여행기입니다."));
    }

    @DisplayName("여행기 좋아요 취소를 할 때 로그인 되어 있지 않으면 예외가 발생한다.")
    @Test
    void unlikeTravelogueWithNotLoginThrowException() {
        testHelper.initTravelogueTestDataWithLike(member);

        RestAssured.given().log().all()
                .when().delete("/api/v1/travelogues/1/like")
                .then().log().all()
                .statusCode(401)
                .body("message", is("로그인을 해주세요."));
    }
}
