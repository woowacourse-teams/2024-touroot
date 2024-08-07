package kr.touroot.travelplan.domain;

import static kr.touroot.authentication.fixture.MemberFixture.MEMBER_KAKAO;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalDate;
import java.util.UUID;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.member.domain.LoginType;
import kr.touroot.member.domain.Member;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("여행 계획")
class TravelPlanTest {

    private static final Member VALID_AUTHOR = MEMBER_KAKAO.getMember();
    private static final String VALID_TITLE = "제주도 여행 계획";
    private static final UUID VALID_UUID = UUID.randomUUID();
    private static final LocalDate VALID_START_DATE = LocalDate.now().plusDays(2);
    public static final String EMPTY_FIELD_EXIST_MESSAGE = "여행 계획에서 제목과 시작 날짜, 공유 키, 그리고 작성자는 비어 있을 수 없습니다";

    @DisplayName("올바른 여행 계획 생성 시에는 예외가 발생하지 않는다")
    @Test
    void createTravelPlanWithValidData() {
        assertThatCode(() -> new TravelPlan(VALID_TITLE, VALID_START_DATE, VALID_UUID, VALID_AUTHOR))
                .doesNotThrowAnyException();
    }

    @DisplayName("여행 계획의 제목이 비어 있는 경우 여행 계획 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanWithNullTitle() {
        assertThatThrownBy(() -> new TravelPlan(null, VALID_START_DATE, VALID_UUID, VALID_AUTHOR))
                .isInstanceOf(BadRequestException.class)
                .hasMessage(EMPTY_FIELD_EXIST_MESSAGE);
    }

    @DisplayName("여행 계획의 시작 날짜가 비어 있는 경우 여행 계획 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanWithNullStartDate() {
        assertThatThrownBy(() -> new TravelPlan(VALID_TITLE, null, VALID_UUID, VALID_AUTHOR))
                .isInstanceOf(BadRequestException.class)
                .hasMessage(EMPTY_FIELD_EXIST_MESSAGE);
    }

    @DisplayName("여행 게획의 공유 키가 비어 있는 경우 여행 계획 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanWithNullShareKey() {
        assertThatThrownBy(() -> new TravelPlan(VALID_TITLE, null, VALID_UUID, VALID_AUTHOR))
                .isInstanceOf(BadRequestException.class)
                .hasMessage(EMPTY_FIELD_EXIST_MESSAGE);
    }

    @DisplayName("여행 계획 제목이 공백 문자로만 이루어져 있는 경우 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {" ", "   ", "    "})
    void createTravelPlanWithBlankTitle(String blank) {
        assertThatThrownBy(() -> new TravelPlan(blank, VALID_START_DATE, VALID_UUID, VALID_AUTHOR))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획에서 제목은 공백 문자로만 이루어질 수 없습니다");
    }

    @DisplayName("여행 계획 제목이 1자에서 20자 사이의 길이가 아니라면 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanWithInvalidLengthTitle() {
        String length21 = "서울 명동: 패션 쇼핑과 길거리 음식,";

        assertThatThrownBy(() -> new TravelPlan(length21, VALID_START_DATE, VALID_UUID, VALID_AUTHOR))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획은 1자 이상, 20자 이하여야 합니다");
    }

    @DisplayName("여행 계획은 지난 날짜를 검증할 시 예외가 발생한다.")
    @Test
    void validateStartDate() {
        TravelPlan travelPlan = new TravelPlan(VALID_TITLE, LocalDate.MIN, VALID_UUID, VALID_AUTHOR);

        assertThatCode(travelPlan::validateStartDate)
                .isInstanceOf(BadRequestException.class)
                .hasMessage("지난 날짜에 대한 계획은 작성할 수 없습니다.");
        // when
        boolean actual = travelPlan.isValidStartDate();

        // then
        assertThat(actual).isFalse();
    }

    @DisplayName("여행 계획은 작성자가 아닌 사용자가 검증을 시도하면 예외가 발생한다.")
    @Test
    void validateAuthor() {
        // given
        Member author = new Member(1L, 1L, null, null, "tester", "http://url.com", LoginType.KAKAO);
        TravelPlan travelPlan = new TravelPlan("test", LocalDate.MIN, VALID_UUID, author);
        Member notAuthor = new Member(2L, 2L, null, null, "tester2", "http://url.com", LoginType.KAKAO);

        // when
        boolean actual = travelPlan.isAuthor(notAuthor);

        // then
        assertThat(actual).isFalse();
    }
}
