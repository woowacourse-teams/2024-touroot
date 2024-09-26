package kr.touroot.travelplan.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
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
import kr.touroot.global.entity.BaseEntity;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.place.domain.Place;
import kr.touroot.position.domain.Position;
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

    @Embedded
    private Position position;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Place place;

    @OneToMany(mappedBy = "travelPlanPlace", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TravelPlaceTodo> travelPlaceTodos = new ArrayList<>();

    public TravelPlanPlace(Long id, Integer order, TravelPlanDay day, String name, Position position) {
        validate(order, day, name, position);
        this.id = id;
        this.order = order;
        this.day = day;
        this.name = name;
        this.position = position;
    }

    public TravelPlanPlace(Integer order, TravelPlanDay day, String name, String latitude, String longitude) {
        this(null, order, day, name, new Position(latitude, longitude));
    }


    private void validate(Integer order, TravelPlanDay day, String name, Position coordinate) {
        validateNotNull(order, day, name, coordinate);
        validateNotBlank(name);
        validateOrderRange(order);
        validatePlaceNameLength(name);
    }

    private void validateNotNull(Integer order, TravelPlanDay day, String name, Position coordinate) {
        if (order == null || day == null || name == null || coordinate == null) {
            throw new BadRequestException("여행 계획 장소에서 순서와 날짜, 그리고 장소 위치는 비어 있을 수 없습니다");
        }
    }

    private void validateNotBlank(String name) {
        if (name.isBlank()) {
            throw new BadRequestException("장소 이름은 공백문자로만 이루어질 수 없습니다");
        }
    }

    private void validateOrderRange(Integer order) {
        if (order < 0) {
            throw new BadRequestException("장소의 방문 순서는 음수일 수 없습니다");
        }
    }

    private void validatePlaceNameLength(String placeName) {
        if (placeName.length() > PLACE_NAME_MAX_LENGTH) {
            throw new BadRequestException("장소 이름은 " + PLACE_NAME_MAX_LENGTH + "자 이하여야 합니다");
        }
    }
}
