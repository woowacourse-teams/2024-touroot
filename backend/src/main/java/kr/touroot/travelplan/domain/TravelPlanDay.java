package kr.touroot.travelplan.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import kr.touroot.global.entity.BaseEntity;
import kr.touroot.global.exception.BadRequestException;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE travel_plan_day SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
@Entity
public class TravelPlanDay extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PLAN_DAY_ORDER", nullable = false)
    Integer order;

    @JoinColumn(name = "PLAN_ID", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TravelPlan plan;

    private TravelPlanDay(Long id, Integer order, TravelPlan plan) {
        validate(order, plan);
        this.id = id;
        this.order = order;
        this.plan = plan;
    }

    public TravelPlanDay(Integer order, TravelPlan plan) {
        this(null, order, plan);
    }

    private void validate(Integer order, TravelPlan plan) {
        validateNotNull(order, plan);
        validateOrderRange(order);
    }

    private void validateNotNull(Integer order, TravelPlan plan) {
        if (order == null || plan == null) {
            throw new BadRequestException("여행 계획 날짜에서 순서와 속하고 있는 여행 계획은 비어 있을 수 없습니다");
        }
    }

    private void validateOrderRange(Integer order) {
        if (order < 0) {
            throw new BadRequestException("여행 계획 날짜 순서는 음수일 수 없습니다");
        }
    }

    public LocalDate getCurrentDate() {
        LocalDate startDate = plan.getStartDate();
        return startDate.plusDays(order);
    }
}
