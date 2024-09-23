package kr.touroot.travelplan.domain;

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
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE travel_plan_place SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
@Entity
public class TravelPlanPlace extends BaseEntity {

    private static final int PLACE_NAME_MAX_LENGTH = 60;
    private static final int MAX_DESCRIPTION_LENGTH = 300;
    private static final Pattern LATITUDE_PATTERN = Pattern.compile("^([-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?))$");
    private static final Pattern LONGITUDE_PATTERN = Pattern.compile(
            "^([-+]?((1[0-7]\\d(\\.\\d+)?|180(\\.0+)?)|([1-9]?\\d(\\.\\d+)?)))$");

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PLAN_PLACE_ORDER", nullable = false)
    private Integer order;

    @JoinColumn(name = "PLAN_DAY_ID", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TravelPlanDay day;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String latitude;

    @Column(nullable = false)
    private String longitude;

    @OneToMany(mappedBy = "travelPlanPlace", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TravelPlaceTodo> travelPlaceTodos = new ArrayList<>();

    public TravelPlanPlace(Long id, Integer order, TravelPlanDay day, String name, String latitude, String longitude) {
        validate(order, day, name, latitude, longitude);
        this.id = id;
        this.order = order;
        this.day = day;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public TravelPlanPlace(Integer order, TravelPlanDay day, String name, String latitude, String longitude) {
        this(null, order, day, name, latitude, longitude);
    }


    private void validate(Integer order, TravelPlanDay day, String name, String latitude, String longitude) {
        validateNotNull(order, day, name, latitude, longitude);
        validateBlank(name, latitude, longitude);
        validateOrderRange(order);
        validateLatitudeLongitudeFormat(latitude, longitude);
        validatePlaceNameLength(name);
    }

    private void validateNotNull(Integer order, TravelPlanDay day, String name, String latitude, String longitude) {
        if (order == null || day == null || name == null || latitude == null || longitude == null) {
            throw new BadRequestException("여행 계획 장소에서 순서와 날짜, 그리고 장소 상세는 비어 있을 수 없습니다");
        }
    }

    private void validateBlank(String name, String latitude, String longitude) {
        if (name.isBlank() || latitude.isBlank() || longitude.isBlank()) {
            throw new BadRequestException("장소 이름, 위도, 경도는 비어 있을 수 없습니다");
        }
    }

    private void validateOrderRange(Integer order) {
        if (order < 0) {
            throw new BadRequestException("장소의 방문 순서는 음수일 수 없습니다");
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
