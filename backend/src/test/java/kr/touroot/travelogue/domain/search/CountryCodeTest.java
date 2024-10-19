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

    @DisplayName("없는 나라 이름으로 찾으면 예외로 처리한다.")
    @Test
    void findByNonCountryName() {
        assertThatThrownBy(() -> CountryCode.findByName("미역국"))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("국가 이름을 찾을 수 없습니다.");
    }
}
