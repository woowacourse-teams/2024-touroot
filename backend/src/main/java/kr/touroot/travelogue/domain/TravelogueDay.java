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
@SQLDelete(sql = "UPDATE travelogue_day SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
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

    @OneToMany(mappedBy = "travelogueDay", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TraveloguePlace> traveloguePlaces = new ArrayList<>();

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

    public void addPlace(TraveloguePlace place) {
        traveloguePlaces.add(place);
        place.updateTravelogueDay(this);
    }

    public void updateTravelogue(Travelogue travelogue) {
        this.travelogue = travelogue;
    }
}
