package woowacourse.touroot.travelplan.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import woowacourse.touroot.global.exception.BadRequestException;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThatCode;

@DisplayName("여행 계획")
class TravelPlanTest {

    @DisplayName("여행 계획은 지난 날짜를 검증할 시 예외가 발생한다.")
    @Test
    void validateStartDate() {
        // given
        TravelPlan travelPlan = new TravelPlan("test", LocalDate.MIN);

        // when & then
        assertThatCode(travelPlan::validateStartDate)
                .isInstanceOf(BadRequestException.class)
                .hasMessage("지난 날짜에 대한 계획은 작성할 수 없습니다.");
    }
}
