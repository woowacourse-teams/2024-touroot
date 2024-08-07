package kr.touroot.travelplan.service;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ForbiddenException;
import kr.touroot.member.domain.Member;
import kr.touroot.member.repository.MemberRepository;
import kr.touroot.place.domain.Place;
import kr.touroot.place.repository.PlaceRepository;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.domain.TravelPlanDay;
import kr.touroot.travelplan.domain.TravelPlanPlace;
import kr.touroot.travelplan.dto.request.PlanDayCreateRequest;
import kr.touroot.travelplan.dto.request.PlanPlaceCreateRequest;
import kr.touroot.travelplan.dto.request.TravelPlanCreateRequest;
import kr.touroot.travelplan.dto.response.TravelPlanCreateResponse;
import kr.touroot.travelplan.dto.response.TravelPlanDayResponse;
import kr.touroot.travelplan.dto.response.TravelPlanPlaceResponse;
import kr.touroot.travelplan.dto.response.TravelPlanResponse;
import kr.touroot.travelplan.repository.TravelPlanDayRepository;
import kr.touroot.travelplan.repository.TravelPlanPlaceRepository;
import kr.touroot.travelplan.repository.TravelPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TravelPlanService {

    private final MemberRepository memberRepository;
    private final TravelPlanRepository travelPlanRepository;
    private final TravelPlanDayRepository travelPlanDayRepository;
    private final TravelPlanPlaceRepository travelPlanPlaceRepository;
    private final PlaceRepository placeRepository;

    @Transactional
    public TravelPlanCreateResponse createTravelPlan(TravelPlanCreateRequest request, MemberAuth memberAuth) {
        Member author = getMemberByMemberAuth(memberAuth);
        TravelPlan travelPlan = request.toTravelPlan(author, UUID.randomUUID());
        validStartDate(travelPlan);

        TravelPlan savedTravelPlan = travelPlanRepository.save(travelPlan);
        createPlanDay(request.days(), savedTravelPlan);

        return new TravelPlanCreateResponse(savedTravelPlan.getId());
    }

    private void validStartDate(TravelPlan travelPlan) {
        if (!travelPlan.isValidStartDate()) {
            throw new BadRequestException("지난 날짜에 대한 계획은 작성할 수 없습니다.");
        }
    }

    private Member getMemberByMemberAuth(MemberAuth memberAuth) {
        return memberRepository.findById(memberAuth.memberId())
                .orElseThrow(() -> new BadRequestException("존재하지 않는 사용자입니다."));
    }

    private void createPlanDay(List<PlanDayCreateRequest> request, TravelPlan savedTravelPlan) {
        for (int order = 0; order < request.size(); order++) {
            PlanDayCreateRequest dayRequest = request.get(order);
            TravelPlanDay travelPlanDay = travelPlanDayRepository.save(dayRequest.toPlanDay(order, savedTravelPlan));
            createPlanPlace(dayRequest.places(), travelPlanDay);
        }
    }

    private void createPlanPlace(List<PlanPlaceCreateRequest> request, TravelPlanDay travelPlanDay) {
        for (int order = 0; order < request.size(); order++) {
            PlanPlaceCreateRequest planRequest = request.get(order);
            Place place = getPlace(planRequest);
            travelPlanPlaceRepository.save(planRequest.toPlanPlace(order, travelPlanDay, place));
        }
    }

    private Place getPlace(PlanPlaceCreateRequest planRequest) {
        return placeRepository.findByNameAndLatitudeAndLongitude(
                planRequest.placeName(),
                planRequest.position().lat(),
                planRequest.position().lng()
        ).orElseGet(() -> placeRepository.save(planRequest.toPlace()));
    }

    @Transactional(readOnly = true)
    public TravelPlanResponse readTravelPlan(Long planId, MemberAuth memberAuth) {
        TravelPlan travelPlan = getTravelPlanById(planId);
        Member member = getMemberByMemberAuth(memberAuth);
        validateReadByAuthor(travelPlan, member);

        return TravelPlanResponse.of(travelPlan, getTravelPlanDayResponses(travelPlan));
    }

    private void validateReadByAuthor(TravelPlan travelPlan, Member member) {
        if (!travelPlan.isAuthor(member)) {
            throw new ForbiddenException("여행 계획 조회는 작성자만 가능합니다.");
        }
    }

    @Transactional(readOnly = true)
    public TravelPlanResponse readTravelPlan(UUID shareKey) {
        TravelPlan travelPlan = getTravelPlanByShareKey(shareKey);

        return TravelPlanResponse.of(travelPlan, getTravelPlanDayResponses(travelPlan));
    }

    private TravelPlan getTravelPlanById(Long planId) {
        return travelPlanRepository.findById(planId)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행 계획입니다."));
    }

    private TravelPlan getTravelPlanByShareKey(UUID shareKey) {
        return travelPlanRepository.findByShareKey(shareKey)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행 계획입니다."));
    }

    public TravelPlanResponse getTravelPlanResponse(TravelPlan travelPlan) {
        return TravelPlanResponse.of(travelPlan, getTravelPlanDayResponses(travelPlan));
    }

    private List<TravelPlanDayResponse> getTravelPlanDayResponses(TravelPlan travelPlan) {
        List<TravelPlanDay> planDays = travelPlanDayRepository.findByPlan(travelPlan);

        return planDays.stream()
                .sorted(Comparator.comparing(TravelPlanDay::getOrder))
                .map(day -> TravelPlanDayResponse.of(day, getTravelPlanPlaceResponses(day)))
                .toList();
    }

    private List<TravelPlanPlaceResponse> getTravelPlanPlaceResponses(TravelPlanDay day) {
        List<TravelPlanPlace> places = travelPlanPlaceRepository.findByDay(day);

        return places.stream()
                .sorted(Comparator.comparing(TravelPlanPlace::getOrder))
                .map(TravelPlanPlaceResponse::from)
                .toList();
    }

    public Page<TravelPlan> getAllByAuthor(Member member, Pageable pageable) {
        return travelPlanRepository.findAllByAuthor(member, pageable);
    }

    public int calculateTravelPeriod(TravelPlan travelPlan) {
        return travelPlanDayRepository.findByPlan(travelPlan)
                .size();
    }

    @Transactional
    public void deleteByTravelPlanId(Long planId, MemberAuth memberAuth) {
        TravelPlan travelPlan = getTravelPlanById(planId);
        Member author = getMemberByMemberAuth(memberAuth);
        validateDeleteByAuthor(travelPlan, author);

        travelPlanPlaceRepository.deleteByDayPlan(travelPlan);
        travelPlanDayRepository.deleteByPlan(travelPlan);
        travelPlanRepository.delete(travelPlan);
    }

    private void validateDeleteByAuthor(TravelPlan travelPlan, Member member) {
        if (!travelPlan.isAuthor(member)) {
            throw new ForbiddenException("여행 계획 삭제는 작성자만 가능합니다.");
        }
    }
}
