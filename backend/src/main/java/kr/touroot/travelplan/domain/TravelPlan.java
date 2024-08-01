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
import kr.touroot.member.domain.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class TravelPlan extends BaseEntity {

    private static final int TITLE_MIN_LENGTH = 1;
    private static final int TITLE_MAX_LENGTH = 20;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDate startDate;

    @JoinColumn(name = "author_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Member author;

    public TravelPlan(Long id, String title, LocalDate startDate, Member author) {
        validate(title, startDate, author);
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.author = author;
    }

    public TravelPlan(String title, LocalDate startDate, Member author) {
        this(null, title, startDate, author);
    }


    private void validate(String title, LocalDate startDate, Member author) {
        validateNotNull(title, startDate, author);
        validateNotBlank(title);
        validateTitleLength(title);
    }

    private void validateNotNull(String title, LocalDate startDate, Member author) {
        if (title == null || startDate == null || author == null) {
            throw new BadRequestException("여행 계획에서 제목과 시작 날짜, 그리고 작성자는 비어 있을 수 없습니다");
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

    public boolean isValidStartDate() {
        return startDate.isAfter(LocalDate.now());
    }

    public boolean isAuthor(Member member) {
        return member.equals(author);
    }
}
