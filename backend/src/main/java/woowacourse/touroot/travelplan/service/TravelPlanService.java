package woowacourse.touroot.travelplan.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.place.repository.PlaceRepository;
import woowacourse.touroot.travelplan.domain.TravelPlan;
import woowacourse.touroot.travelplan.domain.TravelPlanDay;
import woowacourse.touroot.travelplan.dto.PlanDayCreateRequest;
import woowacourse.touroot.travelplan.dto.PlanPlaceRequest;
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
        TravelPlan travelPlan = travelPlanRepository.save(request.toTravelPlan());

        for (PlanDayCreateRequest dayRequest : request.days()) {
            TravelPlanDay travelPlanDay = travelPlanDayRepository.save(dayRequest.toPlanDay(travelPlan));
            createPlanPlace(dayRequest.places(), travelPlanDay);
        }

        return new TravelPlanCreateResponse(travelPlan.getId());
    }

    private void createPlanPlace(List<PlanPlaceRequest> request, TravelPlanDay travelPlanDay) {
        for (PlanPlaceRequest planRequest : request) {
            Place place = placeRepository.findByNameAndLatitudeAndLongitude(
                    planRequest.placeName(),
                    planRequest.location().lat(),
                    planRequest.location().lng()
            ).orElseGet(() -> placeRepository.save(
                            new Place(
                                    planRequest.placeName(),
                                    planRequest.location().lat(),
                                    planRequest.location().lng()
                            )
                    )
            );

            travelPlanPlaceRepository.save(planRequest.toPlanPlace(travelPlanDay, place));
        }
    }
}
