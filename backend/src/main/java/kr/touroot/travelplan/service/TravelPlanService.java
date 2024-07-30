package kr.touroot.travelplan.service;

import java.util.Comparator;
import java.util.List;
import kr.touroot.global.exception.BadRequestException;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TravelPlanService {

    private final TravelPlanRepository travelPlanRepository;
    private final TravelPlanDayRepository travelPlanDayRepository;
    private final TravelPlanPlaceRepository travelPlanPlaceRepository;
    private final PlaceRepository placeRepository;

    @Transactional
    public TravelPlanCreateResponse createTravelPlan(TravelPlanCreateRequest request) {
        TravelPlan travelPlan = request.toTravelPlan();
        travelPlan.validateStartDate();

        TravelPlan savedTravelPlan = travelPlanRepository.save(travelPlan);
        createPlanDay(request.days(), savedTravelPlan);

        return new TravelPlanCreateResponse(savedTravelPlan.getId());
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
    public TravelPlanResponse readTravelPlan(Long planId) {
        TravelPlan travelPlan = getTravelPlanById(planId);
        return TravelPlanResponse.of(travelPlan, getTravelPlanDayResponses(travelPlan));
    }

    private TravelPlan getTravelPlanById(Long planId) {
        return travelPlanRepository.findById(planId)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행 계획입니다."));
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
}
