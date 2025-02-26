package kr.touroot.travelplan.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.UUID;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.dto.ExceptionResponse;
import kr.touroot.travelplan.dto.request.PlanRequest;
import kr.touroot.travelplan.dto.response.PlanCreateResponse;
import kr.touroot.travelplan.dto.response.PlanResponse;
import kr.touroot.travelplan.service.TravelPlanFacadeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "여행 계획")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/travel-plans")
public class TravelPlanController {

    private final TravelPlanFacadeService travelPlanFacadeService;

    @Operation(summary = "여행 계획 생성")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "여행 계획 생성이 정상적으로 성공했을 때"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Body에 유효하지 않은 값이 존재하거나 지난 날짜에 대한 계획을 생성할 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "로그인하지 않은 사용자가 생성을 시도할 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    @PostMapping
    public ResponseEntity<Void> createTravelPlan(
            @Valid @RequestBody PlanRequest request,
            MemberAuth memberAuth
    ) {
        PlanCreateResponse data = travelPlanFacadeService.createTravelPlan(request, memberAuth);
        return ResponseEntity.created(URI.create("/api/v1/travel-plans/" + data.id())).build();
    }

    @Operation(summary = "여행 계획 상세 조회")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "여행 계획 상세 조회가 정상적으로 성공했을 때"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "존재하지 않은 여행 계획을 조회할 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "작성자가 아닌 사용자가 조회를 시도할 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    @GetMapping("/{id}")
    public ResponseEntity<PlanResponse> readTravelPlan(
            @Parameter(description = "여행 계획 id") @PathVariable Long id,
            MemberAuth memberAuth
    ) {
        PlanResponse data = travelPlanFacadeService.findTravelPlanById(id, memberAuth);
        return ResponseEntity.ok(data);
    }

    @Operation(summary = "여행 계획 수정")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "요청이 정상적으로 처리되었을 때"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "요청 Body에 올바르지 않은 값이 전달되었을 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "작성자가 아닌 사용자가 요청했을 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTravelPlan(
            @PathVariable Long id,
            @Valid MemberAuth memberAuth,
            @Valid @RequestBody PlanRequest request
    ) {
        travelPlanFacadeService.updateTravelPlanById(id, memberAuth, request);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "여행 계획 삭제")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "요청이 정상적으로 처리되었을 때"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "존재하지 않는 여행 계획 ID로 요청했을 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "작성자가 아닌 사용자가 요청했을 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTravelPlan(@PathVariable Long id, MemberAuth memberAuth) {
        travelPlanFacadeService.deleteTravelPlanById(id, memberAuth);
        return ResponseEntity.noContent()
                .build();
    }

    @Operation(summary = "공유된 여행 계획 상세 조회")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "여행 계획 상세 조회가 정상적으로 성공했을 때"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "존재하지 않은 여행 계획을 조회할 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
    })
    @GetMapping("shared/{shareKey}")
    public ResponseEntity<PlanResponse> readSharedTravelPlan(
            @Parameter(description = "여행 계획 공유 키") @PathVariable UUID shareKey
    ) {
        PlanResponse data = travelPlanFacadeService.findTravelPlanByShareKey(shareKey);
        return ResponseEntity.ok(data);
    }
}
