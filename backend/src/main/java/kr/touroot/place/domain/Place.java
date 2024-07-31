package kr.touroot.place.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import kr.touroot.global.entity.BaseEntity;
import kr.touroot.global.exception.BadRequestException;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Place extends BaseEntity {

    private static final Pattern LATITUDE_PATTERN = Pattern.compile("^([-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?))$");
    private static final Pattern LONGITUDE_PATTERN = Pattern.compile(
            "^([-+]?((1[0-7]\\d(\\.\\d+)?|180(\\.0+)?)|([1-9]?\\d(\\.\\d+)?)))$");
    private static final int PLACE_NAME_MAX_LENGTH = 60;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String latitude;

    @Column(nullable = false)
    private String longitude;

    private String googlePlaceId;

    public Place(Long id, String name, String latitude, String longitude, String googlePlaceId) {
        validate(name, latitude, longitude, googlePlaceId);
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.googlePlaceId = googlePlaceId;
    }

    public Place(String name, String latitude, String longitude, String googlePlaceId) {
        this(null, name, latitude, longitude, googlePlaceId);
    }

    public Place(String name, String latitude, String longitude) {
        this(null, name, latitude, longitude, null);
    }

    private void validate(String name, String latitude, String longitude, String googlePlaceId) {
        validateNotNull(name, latitude, longitude);
        validateBlank(name, latitude, longitude);
        validateLatitudeLongitudeFormat(latitude, longitude);
        validatePlaceNameLength(name);
    }

    private void validateNotNull(String name, String latitude, String longitude) {
        if (name == null || latitude == null || longitude == null) {
            throw new BadRequestException("장소 이름, 위도, 경도는 비어 있을 수 없습니다");
        }
    }

    private void validateBlank(String name, String latitude, String longitude) {
        if (name.isBlank() || latitude.isBlank() || longitude.isBlank()) {
            throw new BadRequestException("장소 이름, 위도, 경도는 비어 있을 수 없습니다");
        }
    }

    private void validateLatitudeLongitudeFormat(String latitude, String longitude) {
        Matcher latitudeMatcher = LATITUDE_PATTERN.matcher(latitude);
        Matcher longitudeMatcher = LONGITUDE_PATTERN.matcher(longitude);
        if (!latitudeMatcher.find() || !longitudeMatcher.find()) {
            throw new BadRequestException("위,경도의 형식이 올바르지 않습니다");
        }
    }

    private void validatePlaceNameLength(String placeName) {
        if (placeName.length() > PLACE_NAME_MAX_LENGTH) {
            throw new BadRequestException("장소 이름은 " + PLACE_NAME_MAX_LENGTH + "자 이하여야 합니다");
        }
    }
}
