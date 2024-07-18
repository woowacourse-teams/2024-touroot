package woowacourse.touroot.travelplan.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import woowacourse.touroot.travelplan.dto.request.TravelPlanCreateRequest;
import woowacourse.touroot.travelplan.dto.response.TravelPlanCreateResponse;
import woowacourse.touroot.travelplan.dto.response.TravelPlanResponse;
import woowacourse.touroot.travelplan.service.TravelPlanService;

@Tag(name = "여행 계획")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/travel-plans")
public class TravelPlanController {

    private final TravelPlanService travelPlanService;

    @Operation(summary = "여행 계획 생성")
    @PostMapping
    public ResponseEntity<TravelPlanCreateResponse> createTravelPlan(@Valid @RequestBody TravelPlanCreateRequest request) {
        TravelPlanCreateResponse data = travelPlanService.createTravelPlan(request);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TravelPlanResponse> readTravelPlan(@PathVariable Long id) {
        TravelPlanResponse data = travelPlanService.readTravelPlan(id);
        return ResponseEntity.ok(data);
    }
}
