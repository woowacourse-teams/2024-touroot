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

@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class TravelogueDay extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "DAY_ORDER", nullable = false)
    private Integer order;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Travelogue travelogue;

    private TravelogueDay(Long id, Integer order, Travelogue travelogue) {
        validate(order, travelogue);
        this.id = id;
        this.order = order;
        this.travelogue = travelogue;
    }

    public TravelogueDay(Integer order, Travelogue travelogue) {
        this(null, order, travelogue);
    }

    private void validate(Integer order, Travelogue travelogue) {
        validateNotNull(order, travelogue);
        validateOrderRange(order);
    }

    private void validateNotNull(Integer order, Travelogue travelogue) {
        if (order == null || travelogue == null) {
            throw new BadRequestException("여행 날짜가 속한 여행기와 여행 날짜의 순서는 비어 있을 수 없습니다");
        }
    }

    private void validateOrderRange(Integer order) {
        if (order < 0) {
            throw new BadRequestException("여행 날짜의 순서는 음수 일 수 없습니다");
        }
    }
}
