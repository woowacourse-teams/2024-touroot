package kr.touroot.travelplan.fixture;

import java.time.LocalDate;
import kr.touroot.authentication.fixture.MemberFixture;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlan;

public enum TravelPlanFixture {

    TRAVEL_PLAN("제주도 여행 계획", LocalDate.now().plusDays(2), MemberFixture.MEMBER_1);

    private final String title;
    private final LocalDate startDate;
    private final Member author;

    TravelPlanFixture(String title, LocalDate startDate, Member author) {
        this.title = title;
        this.startDate = startDate;
        this.author = author;
    }

    public TravelPlan get() {
        return new TravelPlan(title, startDate, author);
    }
}
