package kr.touroot.travelogue.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import kr.touroot.global.exception.BadRequestException;
import kr.touroot.member.domain.Member;
import kr.touroot.member.fixture.MemberFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("여행기 도메인")
class TravelogueTest {

    private static final Member VALID_AUTHOR = MemberFixture.KAKAO_MEMBER.build();
    private static final String VALID_TITLE = "올바른 여행기 제목";
    private static final String VALID_THUMBNAIL = "http://valid-thumbnail.com";
    private static final String UPDATED_TITLE = "수정된 여행기 제목";
    private static final String UPDATED_THUMBNAIL = "http://updated-thumbnail.com";

    @DisplayName("여행기를 수정한다.")
    @Test
    void update() {
        Travelogue travelogue = new Travelogue(VALID_AUTHOR, VALID_TITLE, VALID_THUMBNAIL);
        travelogue.update(UPDATED_TITLE, UPDATED_THUMBNAIL);

        assertAll(
                () -> assertThat(travelogue.getTitle()).isEqualTo(UPDATED_TITLE),
                () -> assertThat(travelogue.getThumbnail()).isEqualTo(UPDATED_THUMBNAIL)
        );
    }

    @DisplayName("검증 규칙에 어긋나지 않는 여행기 생성 시 예외가 발생하지 않는다")
    @Test
    void createTravelogueWithValidData() {
        assertThatCode(() -> new Travelogue(VALID_AUTHOR, VALID_TITLE, VALID_THUMBNAIL))
                .doesNotThrowAnyException();
    }

    @DisplayName("여행기 제목이 null인 경우 여행기 생성 시 예외가 발생한다")
    @Test
    void createTravelogueWithNullTitle() {
        assertThatThrownBy(() -> new Travelogue(VALID_AUTHOR, null, VALID_THUMBNAIL))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("작성자, 여행기 제목, 그리고 여행기 썸네일은 비어있을 수 없습니다");
    }

    @DisplayName("여행기 작성자가 null인 경우 여행기 생성 시 예외가 발생한다")
    @Test
    void createTravelogueWithNullAuthor() {
        assertThatThrownBy(() -> new Travelogue(null, VALID_TITLE, VALID_THUMBNAIL))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("작성자, 여행기 제목, 그리고 여행기 썸네일은 비어있을 수 없습니다");
    }

    @DisplayName("여행기 썸네일이 null인 경우 여행기 생성 시 예외가 발생한다")
    @Test
    void createTravelogueWithNullThumbNail() {
        assertThatThrownBy(() -> new Travelogue(VALID_AUTHOR, VALID_TITLE, null))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("작성자, 여행기 제목, 그리고 여행기 썸네일은 비어있을 수 없습니다");
    }

    @DisplayName("여행기 제목이 비어 있는 경우 여행기 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"", " ", "   "})
    void createTravelogueWithBlankTitle(String blank) {
        assertThatThrownBy(() -> new Travelogue(VALID_AUTHOR, blank, VALID_THUMBNAIL))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행기 제목, 여행기 썸네일은 비어있을 수 없습니다");
    }

    @DisplayName("여행기 썸네일이 비어 있는 경우 여행기 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"", " ", "   "})
    void createTravelogueWithBlankThumbNail(String blank) {
        assertThatThrownBy(() -> new Travelogue(VALID_AUTHOR, VALID_TITLE, blank))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행기 제목, 여행기 썸네일은 비어있을 수 없습니다");
    }

    @DisplayName("여행기 제목의 길이가 1자 이상 20자 이하가 아닌 경우 여행기 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"21-length-stringggggg", "22-length-stringgggggg", "23-length-stringggggggg"})
    void createTravelogueWithInvalidLengthTitle(String invalidLengthTitle) {
        assertThatThrownBy(() -> new Travelogue(VALID_AUTHOR, invalidLengthTitle, VALID_THUMBNAIL))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행기 제목은 1자 이상, 20자 이하여야 합니다");
    }

    @DisplayName("여행기 썸네일 경로가 URL형식을 벗어나는 경우 여행기 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"ht://touroot.com/images/1", "touroot.com/images/1"})
    void createTravelogueWithInvalidThumbnail(String invalidThumbnail) {
        assertThatThrownBy(() -> new Travelogue(VALID_AUTHOR, VALID_TITLE, invalidThumbnail))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("이미지 url 형식이 잘못되었습니다");
    }
}
