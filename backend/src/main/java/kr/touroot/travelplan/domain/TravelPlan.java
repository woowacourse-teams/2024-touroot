package kr.touroot.travelplan.domain;

import jakarta.persistence.*;
import kr.touroot.global.entity.BaseEntity;
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

    public boolean isValidStartDate() {
        return startDate.isAfter(LocalDate.now());
    }

    public boolean isAuthor(Member member) {
        return member.equals(author);
    }
}
