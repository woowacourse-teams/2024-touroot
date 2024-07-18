package woowacourse.touroot.travelplan.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.place.repository.PlaceRepository;
import woowacourse.touroot.travelplan.domain.TravelPlan;
import woowacourse.touroot.travelplan.domain.TravelPlanDay;
import woowacourse.touroot.travelplan.dto.PlanDayCreateRequest;
import woowacourse.touroot.travelplan.dto.PlanPlaceCreateRequest;
import woowacourse.touroot.travelplan.dto.TravelPlanCreateRequest;
import woowacourse.touroot.travelplan.dto.TravelPlanCreateResponse;
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
            TravelPlanDay travelPlanDay = travelPlanDayRepository.save(dayRequest.toPlanDay(savedTravelPlan));
            createPlanPlace(dayRequest.places(), travelPlanDay);
        }
    }

    private void createPlanPlace(List<PlanPlaceCreateRequest> request, TravelPlanDay travelPlanDay) {
        for (PlanPlaceCreateRequest planRequest : request) {
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
}
