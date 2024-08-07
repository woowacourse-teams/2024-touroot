package kr.touroot.travelplan.fixture;

import static kr.touroot.authentication.fixture.MemberFixture.MEMBER_KAKAO;

import java.time.LocalDate;
import java.util.UUID;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlan;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TravelPlanFixture {

    TRAVEL_PLAN("제주도 여행 계획", LocalDate.now().plusDays(2), MEMBER_KAKAO.getMember());

    private final String title;
    private final LocalDate startDate;
    private final Member author;

    public TravelPlan get() {
        return new TravelPlan(title, startDate, UUID.randomUUID(), author);
    }
}
