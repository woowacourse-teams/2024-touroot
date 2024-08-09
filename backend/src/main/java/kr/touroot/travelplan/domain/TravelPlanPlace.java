package kr.touroot.travelplan.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import kr.touroot.global.entity.BaseEntity;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.place.domain.Place;
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

    private static final int MAX_DESCRIPTION_LENGTH = 300;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "VARCHAR(300)")
    private String description;

    @Column(name = "PLAN_PLACE_ORDER", nullable = false)
    private Integer order;

    @JoinColumn(name = "PLAN_DAY_ID", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TravelPlanDay day;

    @JoinColumn(name = "PLACE_ID", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Place place;

    private TravelPlanPlace(Long id, String description, Integer order, TravelPlanDay day, Place place) {
        validate(description, order, day, place);
        this.id = id;
        this.description = description;
        this.order = order;
        this.day = day;
        this.place = place;
    }

    public TravelPlanPlace(String description, Integer order, TravelPlanDay day, Place place) {
        this(null, description, order, day, place);
    }

    private void validate(String description, Integer order, TravelPlanDay day, Place place) {
        validateNotNull(order, day, place);
        validateDescriptionLength(description);
        validateOrderRange(order);
    }

    private void validateNotNull(Integer order, TravelPlanDay day, Place place) {
        if (order == null || day == null || place == null) {
            throw new BadRequestException("여행 계획 장소에서 순서와 날짜, 그리고 장소 상세는 비어 있을 수 없습니다");
        }
    }

    private void validateDescriptionLength(String description) {
        if (description != null && description.length() > MAX_DESCRIPTION_LENGTH) {
            throw new BadRequestException("장소 설명은 " + MAX_DESCRIPTION_LENGTH + "자를 넘을 수 없습니다");
        }
    }

    private void validateOrderRange(Integer order) {
        if (order < 0) {
            throw new BadRequestException("장소의 방문 순서는 음수일 수 없습니다");
        }
    }
}
