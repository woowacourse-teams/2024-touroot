package kr.touroot.travelplan.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalDate;
import kr.touroot.global.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("여행 계획")
class TravelPlanTest {

    private static final String VALID_TITLE = "제주도 여행 계획";
    private static final LocalDate VALID_START_DATE = LocalDate.now().plusDays(2);

    @DisplayName("올바른 여행 계획 생성 시에는 예외가 발생하지 않는다")
    @Test
    void createTravelPlanWithValidData() {
        assertThatCode(() -> new TravelPlan(VALID_TITLE, VALID_START_DATE))
                .doesNotThrowAnyException();
    }

    @DisplayName("여행 계획의 제목이 비어 있는 경우 여행 계획 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanWithNullTitle() {
        assertThatThrownBy(() -> new TravelPlan(null, VALID_START_DATE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획에서 제목과 시작 날짜는 비어 있을 수 없습니다");
    }

    @DisplayName("여행 계획의 시작 날짜가 비어 있는 경우 여행 계획 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanWithNullStartDate() {
        assertThatThrownBy(() -> new TravelPlan(VALID_TITLE, null))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획에서 제목과 시작 날짜는 비어 있을 수 없습니다");
    }

    @DisplayName("여행 계획 제목이 공백 문자로만 이루어져 있는 경우 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {" ", "   ", "    "})
    void createTravelPlanWithBlankTitle(String blank) {
        assertThatThrownBy(() -> new TravelPlan(blank, VALID_START_DATE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획에서 제목은 공백 문자로만 이루어질 수 없습니다");
    }

    @DisplayName("여행 계획 제목이 1자에서 30자 사이의 길이가 아니라면 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanWithInvalidLengthTitle() {
        String length31 = "서울 명동: 패션 쇼핑과 길거리 음식, 멋진 전경 탐방!";

        assertThatThrownBy(() -> new TravelPlan(length31, VALID_START_DATE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획은 1자 이상, 30자 이하여야 합니다");
    }

    @DisplayName("여행 계획은 지난 날짜를 검증할 시 예외가 발생한다.")
    @Test
    void validateStartDate() {
        TravelPlan travelPlan = new TravelPlan(VALID_TITLE, LocalDate.MIN);

        assertThatCode(travelPlan::validateStartDate)
                .isInstanceOf(BadRequestException.class)
                .hasMessage("지난 날짜에 대한 계획은 작성할 수 없습니다.");
    }
}
