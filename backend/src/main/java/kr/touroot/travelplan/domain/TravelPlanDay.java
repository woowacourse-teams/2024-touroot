package kr.touroot.travelplan.domain;

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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
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
    private Integer order;

    @JoinColumn(name = "PLAN_ID", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TravelPlan plan;

    @OneToMany(mappedBy = "day", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TravelPlanPlace> travelPlanPlaces = new ArrayList<>();

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

    public void addPlace(TravelPlanPlace place) {
        travelPlanPlaces.add(place);
        place.updateDay(this);
    }

    public LocalDate getCurrentDate() {
        LocalDate startDate = plan.getStartDate();
        return startDate.plusDays(order);
    }

    public void updatePlan(TravelPlan plan) {
        this.plan = plan;
    }
}
