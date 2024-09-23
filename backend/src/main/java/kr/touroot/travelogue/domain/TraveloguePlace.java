package kr.touroot.travelogue.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import kr.touroot.global.entity.BaseEntity;
import kr.touroot.global.exception.BadRequestException;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE travelogue_place SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
@Entity
public class TraveloguePlace extends BaseEntity {

    private static final int PLACE_NAME_MAX_LENGTH = 60;
    private static final int MAX_DESCRIPTION_LENGTH = 300;
    private static final String LATITUDE_REGEX = "^([-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?))$";
    private static final String LONGITUDE_REGEX = "^([-+]?((1[0-7]\\d(\\.\\d+)?|180(\\.0+)?)|([1-9]?\\d(\\.\\d+)?)))$";
    private static final Pattern LATITUDE_PATTERN = Pattern.compile(LATITUDE_REGEX);
    private static final Pattern LONGITUDE_PATTERN = Pattern.compile(LONGITUDE_REGEX);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PLACE_ORDER", nullable = false)
    private Integer order;

    @Column(columnDefinition = "VARCHAR(300)")
    private String description;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String latitude;

    @Column(nullable = false)
    private String longitude;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TravelogueDay travelogueDay;

    @OneToMany(mappedBy = "traveloguePlace", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TraveloguePhoto> traveloguePhotos = new ArrayList<>();

    public TraveloguePlace(
            Long id,
            Integer order,
            String description,
            String name,
            String latitude,
            String longitude,
            TravelogueDay travelogueDay
    ) {
        validate(order, description, name, latitude, longitude, travelogueDay);
        this.id = id;
        this.order = order;
        this.description = description;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.travelogueDay = travelogueDay;
    }

    public TraveloguePlace(
            Integer order,
            String description,
            String name,
            String latitude,
            String longitude,
            TravelogueDay travelogueDay
    ) {
        this(null, order, description, name, latitude, longitude, travelogueDay);
    }

    private void validate(
            Integer order,
            String description,
            String name,
            String latitude,
            String longitude,
            TravelogueDay travelogueDay
    ) {
        validateNotNull(order, name, latitude, longitude, travelogueDay);
        validateBlank(name, latitude, longitude);
        validateOrderRange(order);
        validateDescriptionLength(description);
        validateLatitudeLongitudeFormat(latitude, longitude);
        validatePlaceNameLength(name);
    }

    private void validateNotNull(Integer order, String name, String latitude, String longitude, TravelogueDay day) {
        if (order == null || name == null || latitude == null || longitude == null || day == null) {
            throw new BadRequestException("여행기 장소에서 순서와 장소 상세 정보, 그리고 방문 날짜는 비어 있을 수 없습니다");
        }
    }

    private void validateBlank(String name, String latitude, String longitude) {
        if (name.isBlank() || latitude.isBlank() || longitude.isBlank()) {
            throw new BadRequestException("장소 이름, 위도, 경도는 비어 있을 수 없습니다");
        }
    }

    private void validateOrderRange(Integer order) {
        if (order < 0) {
            throw new BadRequestException("여행 장소의 순서는 음수일 수 없습니다");
        }
    }

    private void validateDescriptionLength(String description) {
        if (description != null && description.length() > MAX_DESCRIPTION_LENGTH) {
            throw new BadRequestException("여행 장소에 대한 설명은 " + MAX_DESCRIPTION_LENGTH + "자를 넘길 수 없습니다");
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
