package kr.touroot.member.controller;

import static kr.touroot.member.fixture.MemberRequestFixture.EMPTY_EMAIL_MEMBER;
import static kr.touroot.member.fixture.MemberRequestFixture.EMPTY_NICKNAME_MEMBER;
import static kr.touroot.member.fixture.MemberRequestFixture.EMPTY_PASSWORD_MEMBER;
import static kr.touroot.member.fixture.MemberRequestFixture.EMPTY_PROFILE_IMAGE_URL_MEMBER;
import static kr.touroot.member.fixture.MemberRequestFixture.VALID_MEMBER;
import static org.hamcrest.Matchers.is;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import kr.touroot.global.AcceptanceTest;
import kr.touroot.member.dto.request.MemberRequest;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;

@DisplayName("사용자 컨트롤러")
@AcceptanceTest
class MemberControllerTest {

    private final DatabaseCleaner databaseCleaner;

    @LocalServerPort
    private int port;

    @Autowired
    public MemberControllerTest(DatabaseCleaner databaseCleaner) {
        this.databaseCleaner = databaseCleaner;
    }

    @BeforeEach
    void setUp() {
        RestAssured.port = port;

        databaseCleaner.executeTruncate();
    }

    @DisplayName("회원 가입을 한다.")
    @Test
    void createTravelogue() {
        MemberRequest request = VALID_MEMBER.getRequest();

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/members")
                .then().log().all()
                .statusCode(201)
                .header("Location", "/api/v1/members/1");
    }

    @DisplayName("비어있는 이메일로 회원 가입하면 예외가 발생한다.")
    @Test
    void createTravelogueWithEmptyEmail() {
        MemberRequest request = EMPTY_EMAIL_MEMBER.getRequest();

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/members")
                .then().log().all()
                .statusCode(400)
                .body("message", is("이메일은 비어있을 수 없습니다."));
    }

    @DisplayName("비어있는 비밀번호로 회원 가입하면 예외가 발생한다.")
    @Test
    void createTravelogueWithEmptyPassword() {
        MemberRequest request = EMPTY_PASSWORD_MEMBER.getRequest();

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/members")
                .then().log().all()
                .statusCode(400)
                .body("message", is("비밀번호는 비어있을 수 없습니다."));
    }

    @DisplayName("비어있는 닉네임으로 회원 가입하면 예외가 발생한다.")
    @Test
    void createTravelogueWithEmptyNickname() {
        MemberRequest request = EMPTY_NICKNAME_MEMBER.getRequest();

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/members")
                .then().log().all()
                .statusCode(400)
                .body("message", is("닉네임은 비어있을 수 없습니다."));
    }

    @DisplayName("비어있는 프로필 사진 경로로 회원 가입하면 예외가 발생한다.")
    @Test
    void createTravelogueWithEmptyProfileImageUrl() {
        MemberRequest request = EMPTY_PROFILE_IMAGE_URL_MEMBER.getRequest();

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when().post("/api/v1/members")
                .then().log().all()
                .statusCode(400)
                .body("message", is("프로필 사진 URL은 비어있을 수 없습니다."));
    }
}
