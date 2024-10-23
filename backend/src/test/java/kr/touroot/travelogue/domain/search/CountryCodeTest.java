package kr.touroot.travelogue.domain.search;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class CountryCodeTest {

    @DisplayName("국가 이름으로 찾으면 국가 코드를 반환한다.")
    @ValueSource(strings = {"한국", "대한민국"})
    @ParameterizedTest
    void findByName(String name) {
        CountryCode code = CountryCode.findByName(name);

        assertThat(code)
                .isEqualTo(CountryCode.KR);
    }

    @DisplayName("없는 나라 이름으로 찾으면 NONE을 반환한다.")
    @Test
    void findByNonCountryName() {
        CountryCode code = CountryCode.findByName("미역국");

        assertThat(code)
                .isEqualTo(CountryCode.NONE);
    }

    @DisplayName("대소문자와 관계없이 국가코드로 찾을 수 있다.")
    @ValueSource(strings = {"KR", "kr", "Kr"})
    @ParameterizedTest
    void from(String code) {
        CountryCode countryCode = CountryCode.from(code);

        assertThat(countryCode)
                .isEqualTo(CountryCode.KR);
    }

    @DisplayName("존재하지 않는 국가 코드로 찾으면 예외가 발생한다.")
    @Test
    void fromNotExists() {
        assertThatThrownBy(() -> CountryCode.from("WOO"))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 국가 코드입니다.");
    }
}
