package kr.touroot.travelplan.fixture;


import java.time.LocalDate;
import java.util.UUID;
import kr.touroot.member.domain.Member;
import kr.touroot.member.fixture.MemberFixture;
import kr.touroot.travelplan.domain.TravelPlan;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TravelPlanFixture {

    TRAVEL_PLAN("제주도 여행 계획", LocalDate.now().plusDays(2), UUID.randomUUID(), MemberFixture.KAKAO_MEMBER.getMember());

    private final String title;
    private final LocalDate startDate;
    private final UUID shareKey;
    private final Member author;

    public TravelPlan get() {
        return new TravelPlan(title, startDate, shareKey, author);
    }

    public TravelPlan get(Member author) {
        return new TravelPlan(title, startDate, shareKey, author);
    }

    public TravelPlan get(Member author, LocalDate startDate) {
        return new TravelPlan(title, startDate, shareKey, author);
    }
}
