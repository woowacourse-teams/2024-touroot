package kr.touroot.member.service;

import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.member.domain.Member;
import kr.touroot.member.dto.MyTravelPlanResponse;
import kr.touroot.member.dto.ProfileResponse;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePlace;
import kr.touroot.travelogue.dto.response.TravelogueDayResponse;
import kr.touroot.travelogue.dto.response.TraveloguePlaceResponse;
import kr.touroot.travelogue.dto.response.TravelogueResponse;
import kr.touroot.travelogue.service.TravelogueDayService;
import kr.touroot.travelogue.service.TraveloguePhotoService;
import kr.touroot.travelogue.service.TraveloguePlaceService;
import kr.touroot.travelogue.service.TravelogueService;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.service.TravelPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MyPageFacadeService {

    private final MemberService memberService;
    private final TravelogueService travelogueService;
    private final TravelogueDayService travelogueDayService;
    private final TraveloguePlaceService traveloguePlaceService;
    private final TraveloguePhotoService traveloguePhotoService;
    private final TravelPlanService travelPlanService;

    @Transactional(readOnly = true)
    public ProfileResponse readProfile(MemberAuth memberAuth) {
        Member member = memberService.getById(memberAuth.memberId());
        return ProfileResponse.from(member);
    }

    @Transactional(readOnly = true)
    public Page<TravelogueResponse> readTravelogues(MemberAuth memberAuth, Pageable pageable) {
        Member member = memberService.getById(memberAuth.memberId());
        Page<Travelogue> travelogues = travelogueService.findAllByMember(member, pageable);

        return travelogues.map(this::getTravelogueResponse);
    }

    private TravelogueResponse getTravelogueResponse(Travelogue travelogue) {
        List<TravelogueDayResponse> dayResponses = travelogueDayService.findDaysByTravelogue(travelogue).stream()
                .map((this::getTravelogueDayResponse))
                .toList();
        return TravelogueResponse.of(travelogue, dayResponses);
    }

    private TravelogueDayResponse getTravelogueDayResponse(TravelogueDay travelogueDay) {
        List<TraveloguePlaceResponse> placeResponses = traveloguePlaceService.findTraveloguePlacesByDay(travelogueDay).stream()
                .map(this::getTraveloguePlaceResponse)
                .toList();
        return TravelogueDayResponse.of(travelogueDay, placeResponses);
    }

    private TraveloguePlaceResponse getTraveloguePlaceResponse(TraveloguePlace traveloguePlace) {
        List<String> traveloguePhotos = traveloguePhotoService.findPhotoUrlsByPlace(traveloguePlace);
        return TraveloguePlaceResponse.of(traveloguePlace, traveloguePhotos);
    }

    @Transactional(readOnly = true)
    public Page<MyTravelPlanResponse> readTravelPlans(MemberAuth memberAuth, Pageable pageable) {
        Member member = memberService.getById(memberAuth.memberId());
        Page<TravelPlan> travelPlans = travelPlanService.getAllByAuthor(member, pageable);

        return travelPlans.map(this::getMyTravelPlanResponse);
    }

    private MyTravelPlanResponse getMyTravelPlanResponse(TravelPlan travelPlan) {
        int period = travelPlanService.calculateTravelPeriod(travelPlan);
        return MyTravelPlanResponse.of(travelPlan, period);
    }
}
