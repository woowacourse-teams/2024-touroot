package kr.touroot.member.controller;

import static org.hamcrest.Matchers.is;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import java.util.List;
import kr.touroot.authentication.infrastructure.JwtTokenProvider;
import kr.touroot.global.AcceptanceTest;
import kr.touroot.image.domain.ImageFile;
import kr.touroot.image.infrastructure.AwsS3Provider;
import kr.touroot.member.domain.Member;
import kr.touroot.member.dto.request.ProfileUpdateRequest;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import kr.touroot.travelplan.helper.TravelPlanTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

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
    private final AwsS3Provider s3Provider;

    @Autowired
    public MyPageControllerTest(
            DatabaseCleaner databaseCleaner,
            JwtTokenProvider jwtTokenProvider,
            TravelogueTestHelper travelogueTestHelper,
            TravelPlanTestHelper travelPlanTestHelper,
            AwsS3Provider s3Provider
    ) {
        this.databaseCleaner = databaseCleaner;
        this.jwtTokenProvider = jwtTokenProvider;
        this.travelogueTestHelper = travelogueTestHelper;
        this.travelPlanTestHelper = travelPlanTestHelper;
        this.s3Provider = s3Provider;
    }

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
        databaseCleaner.executeTruncate();

        member = travelogueTestHelper.initKakaoMemberTestData();
        accessToken = jwtTokenProvider.createToken(member.getId())
                .accessToken();
    }

    @DisplayName("마이 페이지 컨트롤러는 내 여행기 조회 요청이 들어오면 로그인한 사용자의 여행기를 조회한다.")
    @Test
    void readTravelogues() {
        // given
        travelogueTestHelper.initTravelogueTestData(member);
        travelogueTestHelper.initTravelogueTestData(member);
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

    @DisplayName("마이 페이지 컨트롤러는 내 프로필 수정 요청이 들어오면 로그인한 사용자의 프로필을 수정한다.")
    @Test
    void updateProfile() {
        // given
        String newNickname = "newNickname";
        MultipartFile multipartFile = new MockMultipartFile("file", "image.jpg", "image/jpeg",
                "image content".getBytes());
        String newProfileImageUrl = s3Provider.uploadImages(List.of(new ImageFile(multipartFile)))
                .get(0)
                .replace("temporary", "images");
        ProfileUpdateRequest request = new ProfileUpdateRequest(newNickname, newProfileImageUrl);

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().log().all()
                .patch("/api/v1/member/me/profile")
                .then().log().all()
                .statusCode(200)
                .body("nickname", is(newNickname))
                .body("profileImageUrl", is(newProfileImageUrl));
    }

    @DisplayName("마이 페이지 컨트롤러는 내 닉네임 수정 요청이 들어오면 로그인한 사용자의 닉네임을 수정한다.")
    @Test
    void updateNickname() {
        // given
        String newNickname = "newNickname";
        ProfileUpdateRequest request = new ProfileUpdateRequest(newNickname, null);

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().log().all()
                .patch("/api/v1/member/me/profile")
                .then().log().all()
                .statusCode(200)
                .body("nickname", is(newNickname));
    }

    @DisplayName("마이 페이지 컨트롤러는 내 닉네임 수정 요청이 들어오면 로그인한 사용자의 닉네임을 수정한다.")
    @Test
    void updateProfileImageUrl() {
        // given
        MultipartFile multipartFile = new MockMultipartFile("file", "image.jpg", "image/jpeg",
                "image content".getBytes());
        String newProfileImageUrl = s3Provider.uploadImages(List.of(new ImageFile(multipartFile)))
                .get(0)
                .replace("temporary", "images");
        ProfileUpdateRequest request = new ProfileUpdateRequest(null, newProfileImageUrl);

        // when & then
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(request)
                .when().log().all()
                .patch("/api/v1/member/me/profile")
                .then().log().all()
                .statusCode(200)
                .body("profileImageUrl", is(newProfileImageUrl));
    }
}
