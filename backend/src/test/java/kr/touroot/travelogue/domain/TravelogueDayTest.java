package kr.touroot.travelogue.domain;

import static kr.touroot.travelogue.fixture.TravelogueFixture.TRAVELOGUE;
import static kr.touroot.travelogue.fixture.TraveloguePlaceFixture.TRAVELOGUE_PLACE;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("여행기 날짜")
class TravelogueDayTest {

    private static final Integer VALID_ORDER = 0;
    private static final Travelogue VALID_TRAVELOGUE = TRAVELOGUE.get();

    @DisplayName("유효한 여행 날짜 생성 시 예외가 발생하지 않는다")
    @Test
    void createTravelogueDayWithValidData() {
        assertThatCode(() -> new TravelogueDay(VALID_ORDER, VALID_TRAVELOGUE))
                .doesNotThrowAnyException();
    }

    @DisplayName("여행 날짜의 순서는 비어 있을 수 없다")
    @Test
    void createTravelogueDayWithNullOrder() {
        assertThatThrownBy(() -> new TravelogueDay(null, VALID_TRAVELOGUE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 날짜가 속한 여행기와 여행 날짜의 순서는 비어 있을 수 없습니다");
    }

    @DisplayName("여행 날짜가 속할 여행기는 비어 있을 수 없다")
    @Test
    void createTravelogueDayWithNullTravelogue() {
        assertThatThrownBy(() -> new TravelogueDay(VALID_ORDER, null))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 날짜가 속한 여행기와 여행 날짜의 순서는 비어 있을 수 없습니다");
    }

    @DisplayName("여행 날짜의 순서는 음수가 될 수 없다")
    @ParameterizedTest
    @ValueSource(ints = {-1, -2, -3, -4, -5})
    void createTravelogueDayWithNegativeOrder(int negative) {
        assertThatThrownBy(() -> new TravelogueDay(negative, VALID_TRAVELOGUE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 날짜의 순서는 음수 일 수 없습니다");
    }

    @DisplayName("여행 장소를 추가할 수 있다")
    @Test
    void addDayInTravelogue() {
        TravelogueDay travelogueDay = new TravelogueDay(1, TRAVELOGUE.get());
        TraveloguePlace traveloguePlace = TRAVELOGUE_PLACE.get();

        travelogueDay.addPlace(traveloguePlace);

        assertThat(travelogueDay.getTraveloguePlaces()).containsExactly(traveloguePlace);
    }

    @DisplayName("여행 날짜에 여행 장소를 추가하면 여행 장소의 여행 날짜 참조도 수정된다")
    @Test
    void addDayInTravelogueThenDayUpdated() {
        TravelogueDay travelogueDay = new TravelogueDay(1, TRAVELOGUE.get());
        TraveloguePlace traveloguePlace = TRAVELOGUE_PLACE.get();

        travelogueDay.addPlace(traveloguePlace);
        
        assertThat(traveloguePlace.getTravelogueDay()).isEqualTo(travelogueDay);
    }
}
