package kr.touroot.travelplan.helper;

import java.time.LocalDate;
import java.util.UUID;
import kr.touroot.member.domain.LoginType;
import kr.touroot.member.domain.Member;
import kr.touroot.member.repository.MemberRepository;
import kr.touroot.place.domain.Place;
import kr.touroot.place.repository.PlaceRepository;
import kr.touroot.travelplan.domain.TravelPlaceTodo;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.domain.TravelPlanDay;
import kr.touroot.travelplan.domain.TravelPlanPlace;
import kr.touroot.travelplan.repository.PlaceTodoRepository;
import kr.touroot.travelplan.repository.TravelPlanDayRepository;
import kr.touroot.travelplan.repository.TravelPlanPlaceRepository;
import kr.touroot.travelplan.repository.TravelPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TravelPlanTestHelper {

    private final PlaceRepository placeRepository;
    private final TravelPlanRepository travelPlanRepository;
    private final TravelPlanDayRepository travelPlanDayRepository;
    private final TravelPlanPlaceRepository travelPlanPlaceRepository;
    private final MemberRepository memberRepository;
    private final PlaceTodoRepository placeTodoRepository;

    @Autowired
    public TravelPlanTestHelper(
            PlaceRepository placeRepository,
            TravelPlanRepository travelPlanRepository,
            TravelPlanDayRepository travelPlanDayRepository,
            TravelPlanPlaceRepository travelPlanPlaceRepository,
            MemberRepository memberRepository,
            PlaceTodoRepository placeTodoRepository
    ) {
        this.placeRepository = placeRepository;
        this.travelPlanRepository = travelPlanRepository;
        this.travelPlanDayRepository = travelPlanDayRepository;
        this.travelPlanPlaceRepository = travelPlanPlaceRepository;
        this.memberRepository = memberRepository;
        this.placeTodoRepository = placeTodoRepository;
    }

    public static Member getKakaoMember(Long kakaoId, String nickname, String profileImageUri) {
        return new Member(kakaoId, nickname, profileImageUri, LoginType.KAKAO);
    }

    public static Place getPlace(String name, String latitude, String longitude, String googlePlaceId) {
        return new Place(name, latitude, longitude, googlePlaceId);
    }

    public static TravelPlan getTravelPlan(String title, LocalDate startDate, Member author) {
        return new TravelPlan(title, startDate, UUID.randomUUID(), author);
    }

    public static TravelPlanDay getTravelPlanDay(int order, TravelPlan travelPlan) {
        return new TravelPlanDay(order, travelPlan);
    }

    public static TravelPlanPlace getTravelPlanPlace(int order, Place place, TravelPlanDay day) {
        return new TravelPlanPlace(order, day, place);
    }

    public static TravelPlaceTodo getTravelPlaceTodo(TravelPlanPlace travelPlanPlace, String content, Integer order,
                                                     Boolean isChecked) {
        return new TravelPlaceTodo(travelPlanPlace, content, order, isChecked);
    }


    public TravelPlan initTravelPlanTestData() {
        Member author = initMemberTestData();
        TravelPlan travelPlan = getTravelPlan("여행계획", LocalDate.MAX, author);
        TravelPlanDay travelPlanDay = getTravelPlanDay(0, travelPlan);
        Place place = getPlace("장소", "37.5175896", "127.0867236", "");
        TravelPlanPlace travelPlanPlace = getTravelPlanPlace(0, place, travelPlanDay);
        TravelPlaceTodo travelPlaceTodo = getTravelPlaceTodo(travelPlanPlace, "테스트짜기", 0, false);

        travelPlanRepository.save(travelPlan);
        travelPlanDayRepository.save(travelPlanDay);
        placeRepository.save(place);
        travelPlanPlaceRepository.save(travelPlanPlace);
        placeTodoRepository.save(travelPlaceTodo);

        return travelPlan;
    }

    public TravelPlan initTravelPlanTestData(Member author) {
        TravelPlan travelPlan = getTravelPlan("여행계획", LocalDate.MAX, author);
        TravelPlanDay travelPlanDay = getTravelPlanDay(0, travelPlan);
        Place place = getPlace("장소", "37.5175896", "127.0867236", "");
        TravelPlanPlace travelPlanPlace = getTravelPlanPlace(0, place, travelPlanDay);
        TravelPlaceTodo travelPlaceTodo = getTravelPlaceTodo(travelPlanPlace, "테스트짜기", 0, false);

        travelPlanRepository.save(travelPlan);
        travelPlanDayRepository.save(travelPlanDay);
        placeRepository.save(place);
        travelPlanPlaceRepository.save(travelPlanPlace);
        placeTodoRepository.save(travelPlaceTodo);

        return travelPlan;
    }

    public Member initMemberTestData() {
        Member member = getKakaoMember(1L, "tester", "https://dev.touroot.kr/temporary/profile.png");
        return memberRepository.save(member);
    }
}
