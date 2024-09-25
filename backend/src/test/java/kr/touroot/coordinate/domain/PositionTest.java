package kr.touroot.coordinate.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("위도 경도 값타입 테스트")
class PositionTest {

    private static final String VALID_LAT = "33.5431";
    private static final String VALID_LNG = "126.6728";

    @DisplayName("올바른 위경도 값타입 생성 시 예외가 발생하지 않는다")
    @Test
    void createCoordinateWithValidData() {
        assertThatCode(() -> new Position(VALID_LAT, VALID_LNG))
                .doesNotThrowAnyException();
    }

    @DisplayName("위도가 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createCoordinateWithNullLatitude() {
        assertThatThrownBy(() -> new Position(null, VALID_LNG))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("위도와 경도는 비어있을 수 없습니다");
    }

    @DisplayName("경도가 비어 있을 경우 여행 계획 장소 생성 시 예외가 발생한다")
    @Test
    void createCoordinateWithNullLongitude() {
        assertThatThrownBy(() -> new Position(VALID_LAT, null))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("위도와 경도는 비어있을 수 없습니다");
    }

    @DisplayName("여행 장소의 위도가 공백문자로만 이루어져 있는 경우 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"", "   ", "    "})
    void createCoordinateWithBlankLatitude(String blank) {
        assertThatThrownBy(() -> new Position(blank, VALID_LNG))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("위도와 경도는 공백 문자로만 이루어질 수 없습니다");
    }

    @DisplayName("여행 장소의 경도가 공백문자로만 이루어져 있는 경우 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"", "   ", "    "})
    void createCoordinateWithBlankLongitude(String blank) {
        assertThatThrownBy(() -> new Position(VALID_LAT, blank))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("위도와 경도는 공백 문자로만 이루어질 수 없습니다");
    }

    @DisplayName("위도 형식에 맞지 않는 위도로 좌표 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"91.0000", "-91.0000", "100.0000", "-100.0000", "abc", "45.0000.0", "45,0000"})
    void createCoordinateWithMalformedLatitude(String malformed) {
        assertThatThrownBy(() -> new Position(malformed, VALID_LNG))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("위,경도의 형식이 올바르지 않습니다");
    }

    @DisplayName("경도 형식에 맞지 않는 위도로 장소 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"181.0000", "-181.0000", "200.0000", "-200.0000", "abc", "100.0000.0", "100,0000"})
    void createCoordinateWithMalformedLongitude(String malformed) {
        assertThatThrownBy(() -> new Position(VALID_LAT, malformed))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("위,경도의 형식이 올바르지 않습니다");
    }
}
