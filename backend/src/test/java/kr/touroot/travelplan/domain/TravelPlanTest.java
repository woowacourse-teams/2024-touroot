package kr.touroot.travelplan.domain;

import kr.touroot.member.domain.Member;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("여행 계획")
class TravelPlanTest {

    @DisplayName("여행 계획은 지난 날짜를 검증할 시 예외가 발생한다.")
    @Test
    void validateStartDate() {
        // given
        TravelPlan travelPlan = new TravelPlan("test", LocalDate.MIN);

        // when
        boolean actual = travelPlan.isValidStartDate();

        // then
        assertThat(actual).isFalse();
    }

    @DisplayName("여행 계획은 작성자가 아닌 사용자가 검증을 시도하면 예외가 발생한다.")
    @Test
    void validateAuthor() {
        // given
        Member author = new Member(1L, 1L, "tester", "http://url.com");
        TravelPlan travelPlan = new TravelPlan("test", LocalDate.MIN, author);
        Member notAuthor = new Member(2L, 2L, "tester2", "http://url.com");

        // when
        boolean actual = travelPlan.isAuthor(notAuthor);

        // then
        assertThat(actual).isFalse();
    }
}
