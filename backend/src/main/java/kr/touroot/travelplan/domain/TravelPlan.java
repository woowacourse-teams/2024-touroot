package kr.touroot.travelplan.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import kr.touroot.global.entity.BaseEntity;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.member.domain.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE travel_plan SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
@Table(indexes = @Index(name = "travel_plan_share_key_idx", columnList = "shareKey"))
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

    @Column(nullable = false)
    private UUID shareKey;

    @JoinColumn(name = "author_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Member author;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TravelPlanDay> travelPlanDays = new ArrayList<>();

    public TravelPlan(Long id, String title, LocalDate startDate, UUID shareKey, Member author) {
        validate(title, startDate, author, shareKey);
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.shareKey = shareKey;
        this.author = author;
    }

    public TravelPlan(String title, LocalDate startDate, UUID shareKey, Member author) {
        this(null, title, startDate, shareKey, author);
    }

    private void validate(String title, LocalDate startDate, Member author, UUID shareKey) {
        validateNotNull(title, startDate, author, shareKey);
        validateNotBlank(title);
        validateTitleLength(title);
    }

    private void validateNotNull(String title, LocalDate startDate, Member author, UUID shareKey) {
        if (title == null || startDate == null || author == null || shareKey == null) {
            throw new BadRequestException("여행 계획에서 제목과 시작 날짜, 공유 키, 그리고 작성자는 비어 있을 수 없습니다");
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

    public void update(String title, LocalDate startDate) {
        this.title = title;
        this.startDate = startDate;
    }

    public void updateDays(List<TravelPlanDay> travelPlanDays) {
        this.travelPlanDays.clear();
        travelPlanDays.forEach(this::addDay);
    }

    public void addDay(TravelPlanDay day) {
        travelPlanDays.add(day);
        day.updatePlan(this);
    }

    public boolean isStartDateBefore(LocalDate date) {
        return startDate.isBefore(date);
    }

    public boolean isAuthor(Member member) {
        return member.equals(author);
    }
}
