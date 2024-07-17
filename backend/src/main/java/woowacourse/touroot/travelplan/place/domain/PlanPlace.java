package woowacourse.touroot.travelplan.place.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import woowacourse.touroot.entity.BaseEntity;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.travelplan.day.domain.PlanDay;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PlanPlace extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Column(nullable = false)
    private int order;

    @JoinColumn(name = "plan_day_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private PlanDay day;

    @JoinColumn(name = "place_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Place place;
}
