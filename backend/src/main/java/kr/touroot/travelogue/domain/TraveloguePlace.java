package kr.touroot.travelogue.domain;

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

    private static final int MAX_DESCRIPTION_LENGTH = 300;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PLACE_ORDER", nullable = false)
    private Integer order;

    @Column(columnDefinition = "VARCHAR(300)")
    private String description;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Place place;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TravelogueDay travelogueDay;

    public TraveloguePlace(Long id, Integer order, String description, Place place, TravelogueDay travelogueDay) {
        validate(order, description, place, travelogueDay);
        this.id = id;
        this.order = order;
        this.description = description;
        this.place = place;
        this.travelogueDay = travelogueDay;
    }

    public TraveloguePlace(Integer order, String description, Place place, TravelogueDay travelogueDay) {
        this(null, order, description, place, travelogueDay);
    }

    private void validate(Integer order, String description, Place place, TravelogueDay travelogueDay) {
        validateNotNull(order, place, travelogueDay);
        validateOrderRange(order);
        validateDescriptionLength(description);
    }

    private void validateNotNull(Integer order, Place place, TravelogueDay travelogueDay) {
        if (order == null || place == null || travelogueDay == null) {
            throw new BadRequestException("여행기 장소에서 순서와 장소 상세 정보, 그리고 방문 날짜는 비어 있을 수 없습니다");
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

    public String getName() {
        return place.getName();
    }

    public String getLatitude() {
        return place.getLatitude();
    }

    public String getLongitude() {
        return place.getLongitude();
    }
}
