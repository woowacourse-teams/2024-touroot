package kr.touroot.travelplan.domain;

import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ForbiddenException;
import kr.touroot.member.domain.Member;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("여행 계획")
class TravelPlanTest {

    @DisplayName("여행 계획은 지난 날짜를 검증할 시 예외가 발생한다.")
    @Test
    void validateStartDate() {
        // given
        TravelPlan travelPlan = new TravelPlan("test", LocalDate.MIN);

        // when & then
        assertThatThrownBy(travelPlan::validateStartDate)
                .isInstanceOf(BadRequestException.class)
                .hasMessage("지난 날짜에 대한 계획은 작성할 수 없습니다.");
    }

    @DisplayName("여행 계획은 작성자가 아닌 사용자가 검증을 시도하면 예외가 발생한다.")
    @Test
    void validateAuthor() {
        // given
        Member author = new Member(1L, 1L, "tester", "http://url.com");
        TravelPlan travelPlan = new TravelPlan("test", LocalDate.MIN, author);
        Member notAuthor = new Member(2L, 2L, "tester2", "http://url.com");

        // when & then
        assertThatThrownBy(() -> travelPlan.validateAuthor(notAuthor))
                .isInstanceOf(ForbiddenException.class)
                .hasMessage("여행 계획은 작성자만 조회할 수 있습니다.");
    }
}
