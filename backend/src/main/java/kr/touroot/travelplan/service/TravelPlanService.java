package kr.touroot.travelplan.service;

import java.time.LocalDate;
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
import kr.touroot.travelplan.domain.TravelPlaceTodo;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.domain.TravelPlanDay;
import kr.touroot.travelplan.domain.TravelPlanPlace;
import kr.touroot.travelplan.dto.request.PlanCreateRequest;
import kr.touroot.travelplan.dto.request.PlanDayCreateRequest;
import kr.touroot.travelplan.dto.request.PlanPlaceCreateRequest;
import kr.touroot.travelplan.dto.request.PlanPlaceTodoRequest;
import kr.touroot.travelplan.dto.response.PlanCreateResponse;
import kr.touroot.travelplan.dto.response.PlanDayResponse;
import kr.touroot.travelplan.dto.response.PlanPlaceResponse;
import kr.touroot.travelplan.dto.response.PlanPlaceTodoResponse;
import kr.touroot.travelplan.dto.response.PlanResponse;
import kr.touroot.travelplan.repository.PlaceTodoRepository;
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
    private final PlaceTodoRepository placeTodoRepository;

    @Transactional
    public PlanCreateResponse createTravelPlan(PlanCreateRequest request, MemberAuth memberAuth) {
        Member author = getMemberByMemberAuth(memberAuth);
        TravelPlan travelPlan = request.toTravelPlan(author, UUID.randomUUID());
        validateTravelPlan(travelPlan);

        TravelPlan savedTravelPlan = travelPlanRepository.save(travelPlan);
        createPlanDay(request.days(), savedTravelPlan);

        return new PlanCreateResponse(savedTravelPlan.getId());
    }

    private void validateTravelPlan(TravelPlan travelPlan) {
        if (travelPlan.isStartDateBefore(LocalDate.now())) {
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
            TravelPlanPlace planPlace = planRequest.toPlanPlace(order, travelPlanDay, place);
            TravelPlanPlace travelPlanPlace = travelPlanPlaceRepository.save(planPlace);
            createPlaceTodo(planRequest.todos(), travelPlanPlace);
        }
    }

    private void createPlaceTodo(List<PlanPlaceTodoRequest> request, TravelPlanPlace travelPlanPlace) {
        for (int order = 0; order < request.size(); order++) {
            PlanPlaceTodoRequest todoRequest = request.get(order);
            TravelPlaceTodo travelPlaceTodo = todoRequest.toUncheckedPlaceTodo(travelPlanPlace, order);
            placeTodoRepository.save(travelPlaceTodo);
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
    public PlanResponse readTravelPlan(Long planId, MemberAuth memberAuth) {
        TravelPlan travelPlan = getTravelPlanById(planId);
        Member member = getMemberByMemberAuth(memberAuth);
        validateReadByAuthor(travelPlan, member);

        return PlanResponse.of(travelPlan, getTravelPlanDayResponses(travelPlan));
    }

    private void validateReadByAuthor(TravelPlan travelPlan, Member member) {
        if (!travelPlan.isAuthor(member)) {
            throw new ForbiddenException("여행 계획 조회는 작성자만 가능합니다.");
        }
    }

    @Transactional(readOnly = true)
    public PlanResponse readTravelPlan(UUID shareKey) {
        TravelPlan travelPlan = getTravelPlanByShareKey(shareKey);

        return PlanResponse.of(travelPlan, getTravelPlanDayResponses(travelPlan));
    }

    private TravelPlan getTravelPlanById(Long planId) {
        return travelPlanRepository.findById(planId)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행 계획입니다."));
    }

    private TravelPlan getTravelPlanByShareKey(UUID shareKey) {
        return travelPlanRepository.findByShareKey(shareKey)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행 계획입니다."));
    }

    public PlanResponse getTravelPlanResponse(TravelPlan travelPlan) {
        return PlanResponse.of(travelPlan, getTravelPlanDayResponses(travelPlan));
    }

    private List<PlanDayResponse> getTravelPlanDayResponses(TravelPlan travelPlan) {
        List<TravelPlanDay> planDays = travelPlanDayRepository.findByPlan(travelPlan);

        return planDays.stream()
                .sorted(Comparator.comparing(TravelPlanDay::getOrder))
                .map(day -> PlanDayResponse.of(day, getTravelPlanPlaceResponses(day)))
                .toList();
    }

    private List<PlanPlaceResponse> getTravelPlanPlaceResponses(TravelPlanDay day) {
        List<TravelPlanPlace> places = travelPlanPlaceRepository.findByDay(day);

        return places.stream()
                .sorted(Comparator.comparing(TravelPlanPlace::getOrder))
                .map(place -> PlanPlaceResponse.of(place, getPlaceTodos(place)))
                .toList();
    }

    private List<PlanPlaceTodoResponse> getPlaceTodos(TravelPlanPlace place) {
        return placeTodoRepository.findByTravelPlanPlace(place)
                .stream()
                .sorted(Comparator.comparing(TravelPlaceTodo::getOrder))
                .map(PlanPlaceTodoResponse::from)
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

        placeTodoRepository.deleteByTravelPlanPlaceDayPlan(travelPlan);
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
