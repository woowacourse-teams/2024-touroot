package kr.touroot.travelplan.domain;

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
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE travel_place_todo SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
@Entity
public class TravelPlaceTodo extends BaseEntity {

    private static final int CONTENT_MIN_LENGTH = 1;
    private static final int CONTENT_MAX_LENGTH = 20;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TravelPlanPlace travelPlanPlace;

    @Column(nullable = false)
    private String content;

    @Column(name = "TODO_ORDER", nullable = false)
    private Integer order;

    @Column(nullable = false)
    private Boolean isChecked;

    private TravelPlaceTodo(Long id, TravelPlanPlace travelPlanPlace, String content, Integer order,
                            Boolean isChecked) {
        validate(travelPlanPlace, content, order, isChecked);
        this.id = id;
        this.travelPlanPlace = travelPlanPlace;
        this.content = content;
        this.order = order;
        this.isChecked = isChecked;
    }

    public TravelPlaceTodo(TravelPlanPlace travelPlanPlace, String content, Integer order, Boolean isChecked) {
        this(null, travelPlanPlace, content, order, isChecked);
    }

    private void validate(TravelPlanPlace travelPlanPlace, String content, Integer order, Boolean isChecked) {
        validateNotNull(travelPlanPlace, content, order, isChecked);
        validateNotBlank(content);
        validateContentLength(content);
        validateOrderNonNegative(order);
    }

    private void validateNotNull(TravelPlanPlace travelPlanPlace, String content, Integer order, Boolean isChecked) {
        if (travelPlanPlace == null || content == null || order == null || isChecked == null) {
            throw new BadRequestException("여행 계획 장소에 대한 TODO에서 장소와 내용, 순서 그리고 달성 여부는 비어 있을 수 없습니다");
        }
    }

    private void validateNotBlank(String content) {
        if (content.isBlank()) {
            throw new BadRequestException("TODO 내용은 빈 문자열로만 이루어질 수 없습니다");
        }
    }

    private void validateContentLength(String content) {
        if (CONTENT_MIN_LENGTH > content.length() || content.length() > CONTENT_MAX_LENGTH) {
            throw new BadRequestException(
                    "TODO 내용의 길이는 " + CONTENT_MIN_LENGTH + "자 이상, " + CONTENT_MAX_LENGTH + "자 이하여야 합니다"
            );
        }
    }

    private void validateOrderNonNegative(Integer order) {
        if (order < 0) {
            throw new BadRequestException("TODO 순서는 음수일 수 없습니다");
        }
    }

    public void updateCheckedStatus(boolean checkedStatus) {
        isChecked = checkedStatus;
    }
}
