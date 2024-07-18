package woowacourse.touroot.travelplan.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import woowacourse.touroot.global.exception.BadRequestException;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.place.repository.PlaceRepository;
import woowacourse.touroot.travelplan.domain.TravelPlan;
import woowacourse.touroot.travelplan.domain.TravelPlanDay;
import woowacourse.touroot.travelplan.dto.request.PlanDayCreateRequest;
import woowacourse.touroot.travelplan.dto.request.PlanPlaceCreateRequest;
import woowacourse.touroot.travelplan.dto.request.TravelPlanCreateRequest;
import woowacourse.touroot.travelplan.dto.response.TravelPlanCreateResponse;
import woowacourse.touroot.travelplan.dto.response.TravelPlanDayResponse;
import woowacourse.touroot.travelplan.dto.response.TravelPlanPlaceResponse;
import woowacourse.touroot.travelplan.dto.response.TravelPlanResponse;
import woowacourse.touroot.travelplan.repository.TravelPlanDayRepository;
import woowacourse.touroot.travelplan.repository.TravelPlanPlaceRepository;
import woowacourse.touroot.travelplan.repository.TravelPlanRepository;

import java.util.List;

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
        createPlanDay(request, savedTravelPlan);

        return new TravelPlanCreateResponse(savedTravelPlan.getId());
    }

    private void createPlanDay(TravelPlanCreateRequest request, TravelPlan savedTravelPlan) {
        for (PlanDayCreateRequest dayRequest : request.days()) {
            // TODO: order는 배열 index로 변경
            TravelPlanDay travelPlanDay = travelPlanDayRepository.save(dayRequest.toPlanDay(savedTravelPlan));
            createPlanPlace(dayRequest.places(), travelPlanDay);
        }
    }

    private void createPlanPlace(List<PlanPlaceCreateRequest> request, TravelPlanDay travelPlanDay) {
        for (PlanPlaceCreateRequest planRequest : request) {
            // TODO: order는 배열 index로 변경
            Place place = getPlace(planRequest);
            travelPlanPlaceRepository.save(planRequest.toPlanPlace(travelPlanDay, place));
        }
    }

    private Place getPlace(PlanPlaceCreateRequest planRequest) {
        return placeRepository.findByNameAndLatitudeAndLongitude(
                planRequest.placeName(),
                planRequest.location().lat(),
                planRequest.location().lng()
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
        return travelPlan.getDays().stream()
                .map(day -> TravelPlanDayResponse.of(day, getTravelPlanPlaceResponses(day)))
                .toList();
    }

    private List<TravelPlanPlaceResponse> getTravelPlanPlaceResponses(TravelPlanDay day) {
        return day.getPlaces().stream()
                .map(TravelPlanPlaceResponse::from)
                .toList();
    }
}
