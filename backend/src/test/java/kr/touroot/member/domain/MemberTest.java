package kr.touroot.member.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("멤버")
class MemberTest {

    private static final Long VALID_SOCIAl_ID = 1L;
    private static final String VALID_EMAIL = "user@email.com";
    private static final String VALID_NICKNAME = "nickname";
    private static final String VALID_PROFILE_IMAGE_URL = "https://dev.touroot.kr/images/ttouri.png";
    private static final LoginType DEFAULT = LoginType.DEFAULT;
    private static final LoginType KAKAO = LoginType.KAKAO;
    private static final String VALID_PASSWORD = "5304d46adc6ccffd0abf352f3e17ba8b807dc3d5e5d12609d0825d7287";

    @DisplayName("검증 규칙을 통과하는 멤버 생성은 예외가 발생하지 않는다")
    @Test
    void createMemberWithValidData() {
        assertThatCode(() -> new Member(VALID_SOCIAl_ID, VALID_NICKNAME, VALID_PROFILE_IMAGE_URL, KAKAO))
                .doesNotThrowAnyException();
    }

    @DisplayName("자체 로그인 시, 이메일과 비밀번호가 null일 때 멤버 생성 시 예외가 발생한다")
    @Test
    void createMemberWithEmailAndPasswordNull() {
        assertThatThrownBy(() -> new Member(null, null, VALID_NICKNAME, VALID_PROFILE_IMAGE_URL, DEFAULT))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("이메일과 비밀번호는 비어 있을 수 없습니다.");
    }

    @DisplayName("자체 로그인 시, 이메일이 비어 있는 경우 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"", "   "})
    void createMemberWithBlankEmail(String blankEmail) {
        assertThatThrownBy(
                () -> new Member(blankEmail, VALID_PASSWORD, VALID_NICKNAME, VALID_PROFILE_IMAGE_URL, DEFAULT))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("이메일과 비밀번호는 비어 있을 수 없습니다.");
    }

    @DisplayName("프로필 이미지 경로가 비어 있는 경우 멤버 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"", "   "})
    void createMemberWithBlankPassword(String blankPassword) {
        assertThatThrownBy(
                () -> new Member(VALID_EMAIL, blankPassword, VALID_NICKNAME, VALID_PROFILE_IMAGE_URL, DEFAULT))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("이메일과 비밀번호는 비어 있을 수 없습니다.");
    }

    @DisplayName("카카오 로그인 시, 카카오 아이디가 null일 때 멤버 생성 시 예외가 발생한다")
    @Test
    void createMemberWithKakaoIdNull() {
        assertThatThrownBy(() -> new Member(null, VALID_NICKNAME, VALID_PROFILE_IMAGE_URL, KAKAO))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("카카오 ID는 비어 있을 수 없습니다");
    }

    @DisplayName("닉네임이 null인 경우 멤버 생성 시 예외가 발생한다")
    @Test
    void createMemberWithNicknameNull() {
        assertThatThrownBy(() -> new Member(VALID_SOCIAl_ID, null, VALID_PROFILE_IMAGE_URL, KAKAO))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("닉네임, 프로필 이미지는 비어 있을 수 없습니다");
    }

    @DisplayName("프로필 이미지 경로가 null일 경우 멤버 생성 시 예외가 발생한다")
    @Test
    void createMemberWithProfileImageUrlNull() {
        assertThatThrownBy(() -> new Member(VALID_SOCIAl_ID, VALID_NICKNAME, null, KAKAO))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("닉네임, 프로필 이미지는 비어 있을 수 없습니다");
    }

    @DisplayName("닉네임이 비어 있는 경우 멤버 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"", "   "})
    void createMemberWithBlankNickname(String blankNickname) {
        assertThatThrownBy(() -> new Member(VALID_SOCIAl_ID, blankNickname, VALID_PROFILE_IMAGE_URL, KAKAO))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("닉네임, 프로필 이미지는 비어 있을 수 없습니다");
    }

    @DisplayName("프로필 이미지 경로가 비어 있는 경우 멤버 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"", "   "})
    void createMemberWithProfileImageBlank(String blankUrl) {
        assertThatThrownBy(() -> new Member(VALID_SOCIAl_ID, VALID_NICKNAME, blankUrl, KAKAO))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("닉네임, 프로필 이미지는 비어 있을 수 없습니다");
    }

    @DisplayName("닉네임의 길이가 범위를 벗어나면 멤버 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"21-length-nicknameeee", "22-length-nicknameeeee"})
    void createMemberWithInvalidLengthNickname(String invalidLengthNickname) {
        assertThatThrownBy(() -> new Member(VALID_SOCIAl_ID, invalidLengthNickname, VALID_PROFILE_IMAGE_URL, KAKAO))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("닉네임은 1자 이상, 20자 이하여야 합니다");
    }

    @DisplayName("프로필 이미지 url의 형식이 잘못된 경우 멤버 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"htt:touroot.kr", "touroot.kr"})
    void createMemberWithInvalidProfileImageUrl(String invalidProfileImageUrl) {
        assertThatThrownBy(() -> new Member(VALID_SOCIAl_ID, VALID_NICKNAME, invalidProfileImageUrl, KAKAO))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("이미지 url 형식이 잘못되었습니다");
    }
}
