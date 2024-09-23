package kr.touroot.coordinate.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import kr.touroot.global.exception.BadRequestException;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class GeographicalCoordinate {

    private static final String LATITUDE_REGEX = "^([-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?))$";
    private static final String LONGITUDE_REGEX = "^([-+]?((1[0-7]\\d(\\.\\d+)?|180(\\.0+)?)|([1-9]?\\d(\\.\\d+)?)))$";
    private static final Pattern LATITUDE_PATTERN = Pattern.compile(LATITUDE_REGEX);
    private static final Pattern LONGITUDE_PATTERN = Pattern.compile(LONGITUDE_REGEX);

    @Column(nullable = false)
    private String latitude;

    @Column(nullable = false)
    private String longitude;

    public GeographicalCoordinate(String latitude, String longitude) {
        validate(latitude, longitude);
        this.latitude = latitude;
        this.longitude = longitude;
    }

    private void validate(String latitude, String longitude) {
        validateNotNull(latitude, longitude);
        validateNotBlank(latitude, longitude);
        validateLatitudeLongitudeFormat(latitude, longitude);
    }

    private void validateNotNull(String latitude, String longitude) {
        if (latitude == null || longitude == null) {
            throw new BadRequestException("위도와 경도는 비어있을 수 없습니다");
        }
    }

    private void validateNotBlank(String latitude, String longitude) {
        if (latitude.isBlank() || longitude.isBlank()) {
            throw new BadRequestException("위도와 경도는 공백 문자로만 이루어질 수 없습니다");
        }
    }

    private void validateLatitudeLongitudeFormat(String latitude, String longitude) {
        Matcher latitudeMatcher = LATITUDE_PATTERN.matcher(latitude);
        Matcher longitudeMatcher = LONGITUDE_PATTERN.matcher(longitude);
        if (!latitudeMatcher.find() || !longitudeMatcher.find()) {
            throw new BadRequestException("위,경도의 형식이 올바르지 않습니다");
        }
    }
}
