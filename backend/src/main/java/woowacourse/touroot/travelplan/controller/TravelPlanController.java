package woowacourse.touroot.travelplan.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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

@Tag(name = "여행기")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/travel-plans")
public class TravelPlanController {

    private final TravelPlanService travelPlanService;

    @Operation(summary = "여행기 생성")
    @PostMapping
    public ResponseEntity<TravelPlanCreateResponse> createTravelPlan(@Valid @RequestBody TravelPlanCreateRequest request) {
        TravelPlanCreateResponse data = travelPlanService.createTravelPlan(request);
        return ResponseEntity.ok()
                .body(data);
    }
}
