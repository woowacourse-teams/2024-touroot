package kr.touroot.travelplan.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.exception.BadRequestException;
import kr.touroot.travelplan.fixture.TravelPlanFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("여행 계획 날짜")
class TravelPlanDayTest {

    private static final Integer VALID_ORDER = 0;
    private static final TravelPlan VALID_PLAN = TravelPlanFixture.TRAVEL_PLAN.get();

    @DisplayName("올바른 여행 계획 날짜 생성 시 예외가 발생하지 않는다")
    @Test
    void createTravelPlanDayWithValidData() {
        assertThatCode(() -> new TravelPlanDay(VALID_ORDER, VALID_PLAN))
                .doesNotThrowAnyException();
    }

    @DisplayName("날짜의 순서가 비어 있을 경우 여행 계획 날짜 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanDayWithNullOrder() {
        assertThatThrownBy(() -> new TravelPlanDay(null, VALID_PLAN))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 날짜에서 순서와 속하고 있는 여행 계획은 비어 있을 수 없습니다");
    }

    @DisplayName("날짜가 속한 여행 계획이 비어 있을 경우 여행 계획 날짜 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanDayWithNullPlan() {
        assertThatThrownBy(() -> new TravelPlanDay(VALID_ORDER, null))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 날짜에서 순서와 속하고 있는 여행 계획은 비어 있을 수 없습니다");
    }

    @DisplayName("여행 계획 날짜의 순서가 음수인 경우 여행 계획 날짜 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(ints = {-1, -2, -3, -4, -5})
    void createTravelPlanDayWithNegativeOrder(int negative) {
        assertThatThrownBy(() -> new TravelPlanDay(negative, VALID_PLAN))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 날짜 순서는 음수일 수 없습니다");
    }
}
