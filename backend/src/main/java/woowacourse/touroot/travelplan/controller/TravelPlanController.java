package woowacourse.touroot.travelplan.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import woowacourse.touroot.global.exception.dto.ExceptionResponse;
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

    @Operation(
            summary = "여행 계획 생성",
            responses = {
                    @ApiResponse(
                            responseCode = "400",
                            description = "Body에 유효하지 않은 값이 존재하거나 지난 날짜에 대한 계획을 생성할 때",
                            content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
                    )
            }
    )
    @PostMapping
    public ResponseEntity<TravelPlanCreateResponse> createTravelPlan(
            @Valid @RequestBody TravelPlanCreateRequest request
    ) {
        TravelPlanCreateResponse data = travelPlanService.createTravelPlan(request);
        return ResponseEntity.ok(data);
    }

    @Operation(
            summary = "여행 계획 상세 조회",
            responses = {
                    @ApiResponse(
                            responseCode = "400",
                            description = "존재하지 않은 여행 계획을 조회할 때",
                            content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
                    )
            }
    )
    @GetMapping("/{id}")
    public ResponseEntity<TravelPlanResponse> readTravelPlan(
            @Parameter(description = "여행 계획 id") @PathVariable Long id
    ) {
        TravelPlanResponse data = travelPlanService.readTravelPlan(id);
        return ResponseEntity.ok(data);
    }
}
