package woowacourse.touroot.travelplan.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import woowacourse.touroot.travelplan.dto.TravelPlanCreateRequest;
import woowacourse.touroot.travelplan.dto.TravelPlanCreateResponse;
import woowacourse.touroot.travelplan.service.TravelPlanService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/travel-plans")
public class TravelPlanController {

    private final TravelPlanService travelPlanService;

    @PostMapping
    public ResponseEntity<TravelPlanCreateResponse> createTravelPlan(@Valid @RequestBody TravelPlanCreateRequest request) {
        TravelPlanCreateResponse data = travelPlanService.createTravelPlan(request);
        return ResponseEntity.ok().body(data);
    }
}
