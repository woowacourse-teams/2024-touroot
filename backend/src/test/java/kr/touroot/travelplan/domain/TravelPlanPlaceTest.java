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

    private static final String VALID_DESCRIPTION = "함덕에서 유명한 맛집";
    private static final Integer VALID_ORDER = 0;
    private static final TravelPlanDay VALID_DAY = TravelPlanDayFixture.TRAVEL_PLAN_DAY.get();
    private static final Place VALID_PLACE = PlaceFixture.PLACE.get();

    @DisplayName("올바른 여행 계획 장소 생성 시 예외가 발생하지 않는다")
    @Test
    void createTravelPlanPlaceWithValidData() {
        assertThatCode(() -> new TravelPlanPlace(VALID_DESCRIPTION, VALID_ORDER, VALID_DAY, VALID_PLACE))
                .doesNotThrowAnyException();
    }

    @DisplayName("여행 계획 장소의 설명이 비어 있어도 예외가 발생하지 않는다")
    @Test
    void createTravelPlanPlaceWithNullDescription() {
        assertThatCode(() -> new TravelPlanPlace(null, VALID_ORDER, VALID_DAY, VALID_PLACE))
                .doesNotThrowAnyException();
    }

    @DisplayName("방문 순서가 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanPlaceWithNullOrder() {
        assertThatThrownBy(() -> new TravelPlanPlace(VALID_DESCRIPTION, null, VALID_DAY, VALID_PLACE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 장소에서 순서와 날짜, 그리고 장소 상세는 비어 있을 수 없습니다");
    }

    @DisplayName("장소의 방문 날짜가 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanPlaceWithNullDay() {
        assertThatThrownBy(() -> new TravelPlanPlace(VALID_DESCRIPTION, VALID_ORDER, null, VALID_PLACE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 장소에서 순서와 날짜, 그리고 장소 상세는 비어 있을 수 없습니다");
    }

    @DisplayName("장소 상세 정보가 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanPlaceWithPlaceNull() {
        assertThatThrownBy(() -> new TravelPlanPlace(VALID_DESCRIPTION, VALID_ORDER, VALID_DAY, null))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 장소에서 순서와 날짜, 그리고 장소 상세는 비어 있을 수 없습니다");
    }

    @DisplayName("여행 계획 장소 설명이 300자를 넘는 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanPlaceWithTitleLengthOver300() {
        String length301 = "함덕 해수욕장은 제주도의 아름다운 해변으로, 맑고 푸른 바다와 깨끗한 백사장이 특징입니다. 이곳은 특히 여름철에 인기가 높으며, 가족 단위 방문객과 커플 모두에게 적합한 장소입니다. 해변의 파도는 비교적 잔잔하여 수영이나 서핑을 즐기기에 좋고, 주변에는 다양한 해산물 맛집과 카페들이 있어 식사와 음료를 즐기기에 편리합니다. 해변을 따라 펼쳐진 산책로에서는 제주도의 자연경관을 감상하며 여유로운 산책이 가능합니다. 특히 일몰 시의 경치가 아름다워 사진 찍기에도 최적의 장소입니다. 함덕 해수욕장에서 제주도의 매력을 만끽해 보세요!!!!!!";

        assertThatThrownBy(() -> new TravelPlanPlace(length301, VALID_ORDER, VALID_DAY, VALID_PLACE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소 설명은 300자를 넘을 수 없습니다");
    }

    @DisplayName("여행 계획 장소의 방문 순서가 음수인 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(ints = {-1, -2, -3, -4, -5})
    void createTravelPlanPlaceWithNegativeOrder(int negative) {
        assertThatThrownBy(() -> new TravelPlanPlace(VALID_DESCRIPTION, negative, VALID_DAY, VALID_PLACE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소의 방문 순서는 음수일 수 없습니다");
    }
}
