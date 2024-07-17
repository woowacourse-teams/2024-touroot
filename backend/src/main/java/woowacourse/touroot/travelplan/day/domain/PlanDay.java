package woowacourse.touroot.travelplan.day.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import woowacourse.touroot.entity.BaseEntity;
import woowacourse.touroot.travelplan.domain.TravelPlan;
import woowacourse.touroot.travelplan.place.domain.PlanPlace;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PlanDay extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    int order;

    @JoinColumn(name = "plan_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TravelPlan plan;

    @OneToMany(mappedBy = "day")
    List<PlanPlace> places;
}
