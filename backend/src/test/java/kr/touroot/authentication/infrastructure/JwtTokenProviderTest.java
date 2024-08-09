package kr.touroot.authentication.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("JWT")
class JwtTokenProviderTest {

    private static final String TEST_SECRET_KEY = "test-secret-key-clover-leegun-naknak-alpaka-libi";
    private static final String TEST_REFRESH_KEY = "test-secret-key-clover-leegun-naknak-alpaka-libi";
    private static final int EXPIRATION_TIME_30_MIN = 1800000;
    private static final int EXPIRATION_TIME_14_DAYS = 1209600000;

    private JwtTokenProvider jwtTokenProvider;

    @DisplayName("멤버를 통해 토큰을 만들 수 있다")
    @Test
    void createTokenTest() {
        jwtTokenProvider = new JwtTokenProvider(
                TEST_SECRET_KEY,
                TEST_REFRESH_KEY,
                EXPIRATION_TIME_30_MIN,
                EXPIRATION_TIME_14_DAYS
        );

        assertThat(jwtTokenProvider.createToken(1L))
                .isNotNull();
    }
}
