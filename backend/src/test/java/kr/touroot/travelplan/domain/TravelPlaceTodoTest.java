package kr.touroot.travelplan.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.exception.BadRequestException;
import kr.touroot.travelplan.fixture.TravelPlanPlaceFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("여행 계획 장소의 TODO")
class TravelPlaceTodoTest {

    private static final TravelPlanPlace VALID_PLACE = TravelPlanPlaceFixture.TRAVEL_PLAN_PLACE.get();
    private static final String VALID_CONTENT = "마라탕 먹기";
    private static final Integer VALID_ORDER = 0;
    private static final Boolean VALID_CHECK = Boolean.TRUE;
    private static final String EMPTY_ERROR_MESSAGE = "여행 계획 장소에 대한 TODO에서 장소와 내용, 순서 그리고 달성 여부는 비어 있을 수 없습니다";

    @DisplayName("올바른 형식으로 TODO를 생성 시 예외가 발생하지 않는다")
    @Test
    void createValidTodo() {
        assertThatCode(() -> new TravelPlaceTodo(VALID_PLACE, VALID_CONTENT, VALID_ORDER, VALID_CHECK))
                .doesNotThrowAnyException();
    }

    @DisplayName("TODO가 속하는 여행 계획 장소가 비어 있을 경우 TODO 생성 시 예외가 발생한다")
    @Test
    void createTodoWithNullPlace() {
        assertThatThrownBy(() -> new TravelPlaceTodo(null, VALID_CONTENT, VALID_ORDER, VALID_CHECK))
                .isInstanceOf(BadRequestException.class)
                .hasMessage(EMPTY_ERROR_MESSAGE);
    }

    @DisplayName("TODO의 내용이 비어 있을 경우 TODO 생성 시 예외가 발생한다")
    @Test
    void createTodoWithNullContent() {
        assertThatThrownBy(() -> new TravelPlaceTodo(VALID_PLACE, null, VALID_ORDER, VALID_CHECK))
                .isInstanceOf(BadRequestException.class)
                .hasMessage(EMPTY_ERROR_MESSAGE);
    }

    @DisplayName("TODO의 순서가 비어 있을 경우 TODO 생성 시 예외가 발생한다")
    @Test
    void createTodoWithNullOrder() {
        assertThatThrownBy(() -> new TravelPlaceTodo(VALID_PLACE, VALID_CONTENT, null, VALID_CHECK))
                .isInstanceOf(BadRequestException.class)
                .hasMessage(EMPTY_ERROR_MESSAGE);
    }

    @DisplayName("TODO의 체크 여부가 비어 있을 경우 TODO 생성 시 예외가 발생한다")
    @Test
    void createTodoWithNullCheck() {
        assertThatThrownBy(() -> new TravelPlaceTodo(VALID_PLACE, VALID_CONTENT, VALID_ORDER, null))
                .isInstanceOf(BadRequestException.class)
                .hasMessage(EMPTY_ERROR_MESSAGE);
    }

    @DisplayName("TODO의 내용이 공백인 경우 TODO 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {" ", "   ", "\n"})
    void createTodoWithBlankContent(String blank) {
        assertThatThrownBy(() -> new TravelPlaceTodo(VALID_PLACE, blank, VALID_ORDER, VALID_CHECK))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("TODO 내용은 빈 문자열로만 이루어질 수 없습니다");
    }

    @DisplayName("TODO의 내용 길이가 범위를 벗어나면 TODO 생성 시 예외가 발생한다")
    @Test
    void createTodoWithInvalidLengthContent() {
        String length21 = "서울 명동에서 패션 쇼핑과 길거리 음식";
        System.out.println("length21 = " + length21.length());
        assertThatThrownBy(() -> new TravelPlaceTodo(VALID_PLACE, length21, VALID_ORDER, VALID_CHECK))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("TODO 내용의 길이는 1자 이상, 20자 이하여야 합니다");
    }

    @DisplayName("TODO의 순서가 음수인 경우 TODO 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(ints = {-1, -2, -3, -4, -5})
    void createTodoWithNegativeOrder(int negative) {
        assertThatThrownBy(() -> new TravelPlaceTodo(VALID_PLACE, VALID_CONTENT, negative, VALID_CHECK))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("TODO 순서는 음수일 수 없습니다");
    }

    @DisplayName("TODO의 상태를 업데이트 할 수 있다")
    @Test
    void updateCheckStatus() {
        TravelPlaceTodo todo = new TravelPlaceTodo(VALID_PLACE, VALID_CONTENT, VALID_ORDER, VALID_CHECK);
        todo.updateCheckedStatus(false);

        assertThat(todo.getIsChecked()).isFalse();
    }
}
