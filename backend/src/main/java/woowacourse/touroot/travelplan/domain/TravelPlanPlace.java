package woowacourse.touroot.travelplan.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import woowacourse.touroot.entity.BaseEntity;
import woowacourse.touroot.place.domain.Place;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
public class TravelPlanPlace extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Column(name = "plan_place_order", nullable = false)
    private Integer order;

    @JoinColumn(name = "plan_day_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TravelPlanDay day;

    @JoinColumn(name = "place_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Place place;

    public TravelPlanPlace(String description, int order, TravelPlanDay day, Place place) {
        this(null, description, order, day, place);
    }
}
