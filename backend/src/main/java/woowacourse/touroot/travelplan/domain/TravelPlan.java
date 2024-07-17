package woowacourse.touroot.travelplan.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import woowacourse.touroot.entity.BaseEntity;
import woowacourse.touroot.global.exception.BadRequestException;

import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
public class TravelPlan extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDate startDate;

    @OneToMany(mappedBy = "plan")
    private List<TravelPlanDay> days;

    public TravelPlan(String title, LocalDate startDate) {
        this(null, title, startDate, null);
    }

    public void validateStartDate() {
        if (startDate.isBefore(LocalDate.now())) {
            throw new BadRequestException("지난 날짜에 대한 계획은 작성할 수 없습니다.");
        }
    }
}
