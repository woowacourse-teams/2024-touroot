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
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE travelogue_photo SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
@Entity
public class TraveloguePhoto extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PHOTO_KEY", nullable = false)
    private String key;

    @Column(name = "PHOTO_ORDER", nullable = false)
    private Integer order;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TraveloguePlace traveloguePlace;

    private TraveloguePhoto(Long id, String key, Integer order, TraveloguePlace traveloguePlace) {
        validate(order, key, traveloguePlace);
        this.id = id;
        this.key = key;
        this.order = order;
        this.traveloguePlace = traveloguePlace;
    }

    public TraveloguePhoto(Integer order, String key, TraveloguePlace traveloguePlace) {
        this(null, key, order, traveloguePlace);
    }

    private void validate(Integer order, String key, TraveloguePlace traveloguePlace) {
        validateNotNull(order, key, traveloguePlace);
        validateOrderRange(order);
    }

    private void validateNotNull(Integer order, String key, TraveloguePlace traveloguePlace) {
        if (order == null || key == null || traveloguePlace == null) {
            throw new BadRequestException("여행 장소의 사진에서 순서와 키, 그리고 사진이 속한 여행 장소는 비어 있을 수 없습니다");
        }
    }

    private void validateOrderRange(Integer order) {
        if (order < 0) {
            throw new BadRequestException("여행 장소에 속하는 사진의 순서는 음수가 될 수 없습니다");
        }
    }
}
