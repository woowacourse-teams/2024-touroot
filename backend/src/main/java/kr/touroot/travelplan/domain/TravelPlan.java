package kr.touroot.travelplan.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;
import kr.touroot.global.entity.BaseEntity;
import kr.touroot.global.exception.BadRequestException;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class TravelPlan extends BaseEntity {

    private static final int TITLE_MIN_LENGTH = 1;
    private static final int TITLE_MAX_LENGTH = 30;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDate startDate;

    private TravelPlan(Long id, String title, LocalDate startDate) {
        validate(title, startDate);
        this.id = id;
        this.title = title;
        this.startDate = startDate;
    }

    public TravelPlan(String title, LocalDate startDate) {
        this(null, title, startDate);
    }

    private void validate(String title, LocalDate startDate) {
        validateNotNull(title, startDate);
        validateNotBlank(title);
        validateTitleLength(title);
    }

    private void validateNotNull(String title, LocalDate startDate) {
        if (title == null || startDate == null) {
            throw new BadRequestException("여행 계획에서 제목과 시작 날짜는 비어 있을 수 없습니다");
        }
    }

    private void validateNotBlank(String title) {
        if (title.isBlank()) {
            throw new BadRequestException("여행 계획에서 제목은 공백 문자로만 이루어질 수 없습니다");
        }
    }

    private void validateTitleLength(String title) {
        if (TITLE_MIN_LENGTH > title.length() || title.length() > TITLE_MAX_LENGTH) {
            throw new BadRequestException("여행 계획은 " + TITLE_MIN_LENGTH + "자 이상, " + TITLE_MAX_LENGTH + "자 이하여야 합니다");
        }
    }

    public void validateStartDate() {
        if (startDate.isBefore(LocalDate.now())) {
            throw new BadRequestException("지난 날짜에 대한 계획은 작성할 수 없습니다.");
        }
    }
}
