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
    private static final String VALID_NICKNAME = "nickname";
    private static final String VALID_PROFILE_IMAGE_URL = "url";


    @DisplayName("검증 규칙을 통과하는 멤버 생성은 예외가 발생하지 않는다")
    @Test
    void createMemberWithValidData() {
        assertThatCode(() -> new Member(1L, VALID_NICKNAME, "url"))
                .doesNotThrowAnyException();
    }

    @DisplayName("카카오 아이디가 null일 때 멤버 생성 시 예외가 발생한다")
    @Test
    void createMemberWithKakaoIdNull() {
        assertThatThrownBy(() -> new Member(null, VALID_NICKNAME, "url"))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("카카오 아이디, 닉네임, 프로필 이미지는 비어 있을 수 없습니다");
    }

    @DisplayName("닉네임이 null인 경우 멤버 생성 시 예외가 발생한다")
    @Test
    void createMemberWithNicknameNull() {
        assertThatThrownBy(() -> new Member(1L, null, "url"))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("카카오 아이디, 닉네임, 프로필 이미지는 비어 있을 수 없습니다");
    }

    @DisplayName("프로필 이미지 경로가 null일 경우 멤버 생성 시 예외가 발생한다")
    @Test
    void createMemberWithProfileImageUrlNull() {
        assertThatThrownBy(() -> new Member(1L, VALID_NICKNAME, null))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("카카오 아이디, 닉네임, 프로필 이미지는 비어 있을 수 없습니다");
    }

    @DisplayName("닉네임이 비어 있는 경우 멤버 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"", "   "})
    void createMemberWithBlankNickname(String blankNickname) {
        assertThatThrownBy(() -> new Member(1L, blankNickname, "url"))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("닉네임, 프로필 이미지는 비어 있을 수 없습니다");
    }

    @DisplayName("프로필 이미지 경로가 비어 있는 경우 멤버 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"", "   "})
    void createMemberWithProfileImageBlank(String blankUrl) {
        assertThatThrownBy(() -> new Member(1L, VALID_NICKNAME, blankUrl))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("닉네임, 프로필 이미지는 비어 있을 수 없습니다");
    }

    @DisplayName("닉네임의 길이가 범위를 벗어나면 멤버 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"21-length-nicknameeee", "22-length-nicknameeeee"})
    void createMemberWithInvalidLengthNickname(String invalidLengthNickname) {
        assertThatThrownBy(() -> new Member(1L, invalidLengthNickname, "url"))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("닉네임은 1자 이상, 20자 이하여야 합니다");
    }
}
