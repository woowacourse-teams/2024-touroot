package kr.touroot.travelplan.domain;

import jakarta.persistence.*;
import kr.touroot.global.entity.BaseEntity;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ForbiddenException;
import kr.touroot.member.domain.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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

    @JoinColumn(name = "author_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Member author;

    public TravelPlan(String title, LocalDate startDate) {
        this(null, title, startDate, null);
    }

    public TravelPlan(String title, LocalDate startDate, Member author) {
        this(null, title, startDate, author);
    }

    public void validateStartDate() {
        if (startDate.isBefore(LocalDate.now())) {
            throw new BadRequestException("지난 날짜에 대한 계획은 작성할 수 없습니다.");
        }
    }

    public void validateAuthor(Member member) {
        if (!member.equals(author)) {
            throw new ForbiddenException("여행 계획은 작성자만 조회할 수 있습니다.");
        }
    }
}
