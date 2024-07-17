package woowacourse.touroot.travelogue.day.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.Getter;
import woowacourse.touroot.entity.BaseEntity;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.place.domain.TraveloguePlace;

@Getter
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

    @OneToMany(mappedBy = "travelogueDay")
    private List<TraveloguePlace> traveloguePlaces;
}
