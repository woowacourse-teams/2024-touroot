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

@DisplayName("여행 계획 장소")
class TravelPlanPlaceTest {

    private static final Integer VALID_ORDER = 0;
    private static final String VALID_NAME = "함덕 해수욕장";
    private static final String VALID_LAT = "33.5431";
    private static final String VALID_LNG = "126.6728";
    private static final String VALID_COUNTRY_CODE = "KR";

    private TravelPlanDay travelPlanDay;

    @BeforeEach
    void setUp() {
        Member planWriter = MemberFixture.KAKAO_MEMBER.getMember();
        TravelPlan travelPlan = TravelPlanFixture.JEJU_TRAVEL_PLAN.getTravelPlanOwnedBy(planWriter);
        travelPlanDay = TravelPlanDayFixture.FIRST_DAY.getTravelPlanDayIncludedIn(travelPlan);
    }

    @DisplayName("올바른 여행 계획 장소 생성 시 예외가 발생하지 않는다")
    @Test
    void createTravelPlanPlaceWithValidData() {
        assertThatCode(
                () -> new TravelPlanPlace(VALID_ORDER, travelPlanDay, VALID_NAME, VALID_LAT, VALID_LNG,
                        VALID_COUNTRY_CODE))
                .doesNotThrowAnyException();
    }

    @DisplayName("방문 순서가 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanPlaceWithNullOrder() {
        assertThatThrownBy(
                () -> new TravelPlanPlace(null, travelPlanDay, VALID_NAME, VALID_LAT, VALID_LNG, VALID_COUNTRY_CODE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 장소에서 순서와 날짜, 장소 위치, 그리고 국가 코드는 비어 있을 수 없습니다");
    }

    @DisplayName("장소의 방문 날짜가 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanPlaceWithNullDay() {
        assertThatThrownBy(
                () -> new TravelPlanPlace(VALID_ORDER, null, VALID_NAME, VALID_LAT, VALID_LNG, VALID_COUNTRY_CODE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 장소에서 순서와 날짜, 장소 위치, 그리고 국가 코드는 비어 있을 수 없습니다");
    }

    @DisplayName("장소 이름이 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanPlaceWithPlaceNullName() {
        assertThatThrownBy(
                () -> new TravelPlanPlace(VALID_ORDER, travelPlanDay, null, VALID_LAT, VALID_LNG, VALID_COUNTRY_CODE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 장소에서 순서와 날짜, 장소 위치, 그리고 국가 코드는 비어 있을 수 없습니다");
    }

    @DisplayName("국가 코드가 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createTravelPlanPlaceWithPlaceNullCountryCode() {
        assertThatThrownBy(
                () -> new TravelPlanPlace(VALID_ORDER, travelPlanDay, VALID_NAME, VALID_LAT, VALID_LNG, null))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 계획 장소에서 순서와 날짜, 장소 위치, 그리고 국가 코드는 비어 있을 수 없습니다");
    }

    @DisplayName("여행 장소 이름이 공백문자로만 이루어져 있는 경우 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"", "   ", "    "})
    void createTravelPlanPlaceWithBlankName(String blank) {
        assertThatThrownBy(
                () -> new TravelPlanPlace(VALID_ORDER, travelPlanDay, blank, VALID_LAT, VALID_LNG, VALID_COUNTRY_CODE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소 이름은 공백문자로만 이루어질 수 없습니다");
    }

    @DisplayName("여행 계획 장소의 방문 순서가 음수인 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(ints = {-1, -2, -3, -4, -5})
    void createTravelPlanPlaceWithNegativeOrder(int negative) {
        assertThatThrownBy(
                () -> new TravelPlanPlace(negative, travelPlanDay, VALID_NAME, VALID_LAT, VALID_LNG,
                        VALID_COUNTRY_CODE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소의 방문 순서는 음수일 수 없습니다");
    }

    @DisplayName("장소 이름의 길이가 60자를 초과하는 경우 장소 생성 시 예외가 발생한다")
    @Test
    void createPlaceWithInvalidLengthPlaceName() {
        String length61 = "Under the summer sun, feeling the cool breeze by the sea is pure joy!!";
        assertThatThrownBy(
                () -> new TravelPlanPlace(VALID_ORDER, travelPlanDay, length61, VALID_LAT, VALID_LNG,
                        VALID_COUNTRY_CODE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소 이름은 60자 이하여야 합니다");
    }

    @DisplayName("존재하지 않는 국가 코드인 경우 장소 생성 시 예외가 발생한다")
    @Test
    void createPlaceWithInvalidCountryCode() {
        assertThatThrownBy(
                () -> new TravelPlanPlace(VALID_ORDER, travelPlanDay, VALID_NAME, VALID_LAT, VALID_LNG, "CONCODE"))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 국가 코드입니다.");
    }

    @DisplayName("Todo를 추가할 수 있다")
    @Test
    void addTodoInPlace() {
        TravelPlanPlace travelPlanPlace = TravelPlanPlaceFixture.HAMDEOK_BEACH.getTravelPlanPlaceIncludedIn(
                travelPlanDay
        );
        TravelPlaceTodo travelPlaceTodo = new TravelPlaceTodo(travelPlanPlace, "투룻 하기", 1, true);

        travelPlanPlace.addTodo(travelPlaceTodo);

        assertThat(travelPlanPlace.getTravelPlaceTodos()).containsExactly(travelPlaceTodo);
    }

    @DisplayName("장소에 Todo를 추가하면 Todo의 장소 참조도 수정된다")
    @Test
    void addTodoThenTodosPlaceUpdated() {
        TravelPlanPlace travelPlanPlace = TravelPlanPlaceFixture.HAMDEOK_BEACH.getTravelPlanPlaceIncludedIn(
                travelPlanDay
        );
        TravelPlaceTodo travelPlaceTodo = new TravelPlaceTodo(travelPlanPlace, "투룻 하기", 1, true);

        travelPlanPlace.addTodo(travelPlaceTodo);

        assertThat(travelPlaceTodo.getTravelPlanPlace()).isEqualTo(travelPlanPlace);
    }
}
