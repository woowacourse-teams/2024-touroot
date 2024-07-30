package woowacourse.touroot.travelplan.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import woowacourse.touroot.member.domain.Member;
import woowacourse.touroot.member.repository.MemberRepository;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.place.repository.PlaceRepository;
import woowacourse.touroot.travelplan.domain.TravelPlan;
import woowacourse.touroot.travelplan.domain.TravelPlanDay;
import woowacourse.touroot.travelplan.domain.TravelPlanPlace;
import woowacourse.touroot.travelplan.repository.TravelPlanDayRepository;
import woowacourse.touroot.travelplan.repository.TravelPlanPlaceRepository;
import woowacourse.touroot.travelplan.repository.TravelPlanRepository;

import java.time.LocalDate;

@Component
public class TravelPlanTestHelper {

    private final PlaceRepository placeRepository;
    private final TravelPlanRepository travelPlanRepository;
    private final TravelPlanDayRepository travelPlanDayRepository;
    private final TravelPlanPlaceRepository travelPlanPlaceRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public TravelPlanTestHelper(
            PlaceRepository placeRepository,
            TravelPlanRepository travelPlanRepository,
            TravelPlanDayRepository travelPlanDayRepository,
            TravelPlanPlaceRepository travelPlanPlaceRepository,
            MemberRepository memberRepository
    ) {
        this.placeRepository = placeRepository;
        this.travelPlanRepository = travelPlanRepository;
        this.travelPlanDayRepository = travelPlanDayRepository;
        this.travelPlanPlaceRepository = travelPlanPlaceRepository;
        this.memberRepository = memberRepository;
    }

    public static Member getMember(Long kakaoId, String nickname, String profileImageUri) {
        return new Member(kakaoId, nickname, profileImageUri);
    }

    public static Place getPlace(String name, String latitude, String longitude, String googlePlaceId) {
        return new Place(name, latitude, longitude, googlePlaceId);
    }

    public static TravelPlan getTravelPlan(String title, LocalDate startDate) {
        return new TravelPlan(title, startDate);
    }

    public static TravelPlanDay getTravelPlanDay(int order, TravelPlan travelPlan) {
        return new TravelPlanDay(order, travelPlan);
    }

    public static TravelPlanPlace getTravelPlanPlace(String description, int order, Place place, TravelPlanDay day) {
        return new TravelPlanPlace(description, order, day, place);
    }

    public void initTravelPlanTestData() {
        TravelPlan travelPlan = getTravelPlan("여행계획", LocalDate.MAX);
        TravelPlanDay travelPlanDay = getTravelPlanDay(0, travelPlan);
        Place place = getPlace("장소", "37.5175896", "127.0867236", "");
        TravelPlanPlace travelPlanPlace = getTravelPlanPlace("설명", 0, place, travelPlanDay);

        travelPlanRepository.save(travelPlan);
        travelPlanDayRepository.save(travelPlanDay);
        placeRepository.save(place);
        travelPlanPlaceRepository.save(travelPlanPlace);
    }

    public Member initMemberTestData() {
        Member member = getMember(1L, "tester", "image");
        return memberRepository.save(member);
    }
}
