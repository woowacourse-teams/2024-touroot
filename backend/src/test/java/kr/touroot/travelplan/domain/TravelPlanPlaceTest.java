package kr.touroot.travelplan.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.exception.BadRequestException;
import kr.touroot.place.domain.Place;
import kr.touroot.place.fixture.PlaceFixture;
import kr.touroot.travelplan.fixture.TravelPlanDayFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("여행 계획 장소")
class TravelPlanPlaceTest {

    private static final Integer VALID_ORDER = 0;
    private static final TravelPlanDay VALID_DAY = TravelPlanDayFixture.TRAVEL_PLAN_DAY.get();
    private static final Place VALID_PLACE = PlaceFixture.PLACE.get();

    @DisplayName("올바른 여행 계획 장소 생성 시 예외가 발생하지 않는다")
    @Test
    void createTravelPlanPlaceWithValidData() {
        assertThatCode(() -> new TravelPlanPlace(VALID_ORDER, VALID_DAY, VALID_PLACE))
                .doesNotThrowAnyException();
    }

    @DisplayName("방문 순서가 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanPlaceWithNullOrder() {
        assertThatThrownBy(() -> new TravelPlanPlace(null, VALID_DAY, VALID_PLACE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 장소에서 순서와 날짜, 그리고 장소 상세는 비어 있을 수 없습니다");
    }

    @DisplayName("장소의 방문 날짜가 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanPlaceWithNullDay() {
        assertThatThrownBy(() -> new TravelPlanPlace(VALID_ORDER, null, VALID_PLACE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 장소에서 순서와 날짜, 그리고 장소 상세는 비어 있을 수 없습니다");
    }

    @DisplayName("장소 상세 정보가 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanPlaceWithPlaceNull() {
        assertThatThrownBy(() -> new TravelPlanPlace(VALID_ORDER, VALID_DAY, null))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 장소에서 순서와 날짜, 그리고 장소 상세는 비어 있을 수 없습니다");
    }

    @DisplayName("여행 계획 장소의 방문 순서가 음수인 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(ints = {-1, -2, -3, -4, -5})
    void createTravelPlanPlaceWithNegativeOrder(int negative) {
        assertThatThrownBy(() -> new TravelPlanPlace(negative, VALID_DAY, VALID_PLACE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소의 방문 순서는 음수일 수 없습니다");
    }
}
