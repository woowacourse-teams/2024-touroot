package kr.touroot.travelogue.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.exception.BadRequestException;
import kr.touroot.travelogue.domain.search.CountryCode;
import kr.touroot.travelogue.fixture.TravelogueFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class TravelogueCountryTest {

    @DisplayName("검증 규칙에 어긋나지 않는 여행기 생성 시 예외가 발생하지 않는다")
    @Test
    void createTravelogueCountryWithValidData() {
        assertThatCode(() -> new TravelogueCountry(TravelogueFixture.TRAVELOGUE.get(), CountryCode.KR, 1))
                .doesNotThrowAnyException();
    }

    @DisplayName("여행기가 null인 경우 여행기 나라 생성 시 예외가 발생한다")
    @Test
    void createTravelogueCountryWithNullTravelogue() {
        assertThatThrownBy(() -> new TravelogueCountry(null, CountryCode.KR, 1))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행기와 국가 코드, 국가 코드의 count 는 null 일 수 없습니다.");
    }

    @DisplayName("국가 코드가 null인 경우 여행기 나라 생성 시 예외가 발생한다")
    @Test
    void createTravelogueCountryWithNullCountryCode() {
        assertThatThrownBy(() -> new TravelogueCountry(TravelogueFixture.TRAVELOGUE.get(), null, 1))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행기와 국가 코드, 국가 코드의 count 는 null 일 수 없습니다.");
    }

    @DisplayName("count가 null인 경우 여행기 나라 생성 시 예외가 발생한다")
    @Test
    void createTravelogueCountryWithNullCount() {
        assertThatThrownBy(() -> new TravelogueCountry(TravelogueFixture.TRAVELOGUE.get(), CountryCode.KR, null))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행기와 국가 코드, 국가 코드의 count 는 null 일 수 없습니다.");
    }

    @DisplayName("count가 1보다 작은 경우 여행기 나라 생성 시 예외가 발생한다")
    @ValueSource(ints = {0, -1})
    @ParameterizedTest
    void createTravelogueCountryWithLessThanMinCount(int count) {
        assertThatThrownBy(() -> new TravelogueCountry(TravelogueFixture.TRAVELOGUE.get(), CountryCode.KR, count))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("국가 코드의 개수는 1 보다 커야합니다.");
    }
}
