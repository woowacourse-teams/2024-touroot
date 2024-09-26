package kr.touroot.travelplan.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.exception.BadRequestException;
import kr.touroot.travelplan.fixture.TravelPlanDayFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("여행 계획 장소")
class TravelPlanPlaceTest {

    private static final Integer VALID_ORDER = 0;
    private static final TravelPlanDay VALID_DAY = TravelPlanDayFixture.TRAVEL_PLAN_DAY.get();
    private static final String VALID_NAME = "함덕 해수욕장";
    private static final String VALID_LAT = "33.5431";
    private static final String VALID_LNG = "126.6728";

    @DisplayName("올바른 여행 계획 장소 생성 시 예외가 발생하지 않는다")
    @Test
    void createTravelPlanPlaceWithValidData() {
        assertThatCode(() -> new TravelPlanPlace(VALID_ORDER, VALID_DAY, VALID_NAME, VALID_LAT, VALID_LNG))
                .doesNotThrowAnyException();
    }

    @DisplayName("방문 순서가 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanPlaceWithNullOrder() {
        assertThatThrownBy(() -> new TravelPlanPlace(null, VALID_DAY, VALID_NAME, VALID_LAT, VALID_LNG))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 장소에서 순서와 날짜, 그리고 장소 위치는 비어 있을 수 없습니다");
    }

    @DisplayName("장소의 방문 날짜가 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanPlaceWithNullDay() {
        assertThatThrownBy(() -> new TravelPlanPlace(VALID_ORDER, null, VALID_NAME, VALID_LAT, VALID_LNG))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 장소에서 순서와 날짜, 그리고 장소 위치는 비어 있을 수 없습니다");
    }

    @DisplayName("장소 이름이 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanPlaceWithPlaceNullName() {
        assertThatThrownBy(() -> new TravelPlanPlace(VALID_ORDER, VALID_DAY, null, VALID_LAT, VALID_LNG))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 장소에서 순서와 날짜, 그리고 장소 위치는 비어 있을 수 없습니다");
    }

    @DisplayName("여행 장소 이름이 공백문자로만 이루어져 있는 경우 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"", "   ", "    "})
    void createTravelPlanPlaceWithBlankName(String blank) {
        assertThatThrownBy(() -> new TravelPlanPlace(VALID_ORDER, VALID_DAY, blank, VALID_LAT, VALID_LNG))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소 이름은 공백문자로만 이루어질 수 없습니다");
    }

    @DisplayName("여행 계획 장소의 방문 순서가 음수인 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(ints = {-1, -2, -3, -4, -5})
    void createTravelPlanPlaceWithNegativeOrder(int negative) {
        assertThatThrownBy(() -> new TravelPlanPlace(negative, VALID_DAY, VALID_NAME, VALID_LAT, VALID_LNG))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소의 방문 순서는 음수일 수 없습니다");
    }

    @DisplayName("장소 이름의 길이가 60자를 초과하는 경우 장소 생성 시 예외가 발생한다")
    @Test
    void createPlaceWithInvalidLengthPlaceName() {
        String length61 = "Under the summer sun, feeling the cool breeze by the sea is pure joy!!";
        assertThatThrownBy(() -> new TravelPlanPlace(VALID_ORDER, VALID_DAY, length61, VALID_LAT, VALID_LNG))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소 이름은 60자 이하여야 합니다");
    }
}
