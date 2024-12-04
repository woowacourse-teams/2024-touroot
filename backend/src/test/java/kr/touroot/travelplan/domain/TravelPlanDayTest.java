package kr.touroot.travelplan.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.exception.BadRequestException;
import kr.touroot.member.domain.Member;
import kr.touroot.member.fixture.MemberFixture;
import kr.touroot.travelplan.fixture.TravelPlanDayFixture;
import kr.touroot.travelplan.fixture.TravelPlanFixture;
import kr.touroot.travelplan.fixture.TravelPlanPlaceFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("여행 계획 날짜")
class TravelPlanDayTest {

    private static final Integer VALID_ORDER = 0;

    private TravelPlan travelPlan;

    @BeforeEach
    void setUp() {
        Member planWriter = MemberFixture.KAKAO_MEMBER.getMember();
        travelPlan = TravelPlanFixture.JEJU_TRAVEL_PLAN.getTravelPlanOwnedBy(planWriter);
    }

    @DisplayName("올바른 여행 계획 날짜 생성 시 예외가 발생하지 않는다")
    @Test
    void createTravelPlanDayWithValidData() {
        assertThatCode(() -> new TravelPlanDay(VALID_ORDER, travelPlan))
                .doesNotThrowAnyException();
    }

    @DisplayName("날짜의 순서가 비어 있을 경우 여행 계획 날짜 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanDayWithNullOrder() {
        assertThatThrownBy(() -> new TravelPlanDay(null, travelPlan))
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
        assertThatThrownBy(() -> new TravelPlanDay(negative, travelPlan))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 날짜 순서는 음수일 수 없습니다");
    }

    @DisplayName("여행 계획 장소를 추가할 수 있다")
    @Test
    void addTravelPlanPlaceInTravelPlanDay() {
        TravelPlanDay travelPlanDay = TravelPlanDayFixture.FIRST_DAY.getTravelPlanDayIncludedIn(travelPlan);
        TravelPlanPlace travelPlanPlace = TravelPlanPlaceFixture.HAMDEOK_BEACH.getTravelPlanPlaceIncludedIn(
                travelPlanDay
        );

        travelPlanDay.addPlace(travelPlanPlace);

        assertThat(travelPlanDay.getTravelPlanPlaces()).containsExactly(travelPlanPlace);
    }

    @DisplayName("여행 계획 날짜에 장소를 추가하는 경우 장소의 날짜 참조도 수정된다")
    @Test
    void addTravelPlanPlaceThenTravelPlanDayUpdated() {
        TravelPlanDay travelPlanDay = TravelPlanDayFixture.FIRST_DAY.getTravelPlanDayIncludedIn(travelPlan);
        TravelPlanPlace travelPlanPlace = TravelPlanPlaceFixture.HAMDEOK_BEACH.getTravelPlanPlaceIncludedIn(
                travelPlanDay
        );

        travelPlanDay.addPlace(travelPlanPlace);

        assertThat(travelPlanPlace.getDay()).isEqualTo(travelPlanDay);
    }
}
