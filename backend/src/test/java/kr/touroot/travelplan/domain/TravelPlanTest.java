package kr.touroot.travelplan.domain;

import static org.assertj.core.api.Assertions.assertThatCode;

import java.time.LocalDate;
import kr.touroot.global.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

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
