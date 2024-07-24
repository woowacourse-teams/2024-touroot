package woowacourse.touroot.travelplan.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import woowacourse.touroot.entity.BaseEntity;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
public class TravelPlanDay extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "plan_day_order", nullable = false)
    Integer order;

    @JoinColumn(name = "plan_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TravelPlan plan;

    public TravelPlanDay(int order, TravelPlan plan) {
        this(null, order, plan);
    }

    public LocalDate getCurrentDate() {
        LocalDate startDate = plan.getStartDate();
        return startDate.plusDays(order);
    }
}
