package kr.touroot.travelplan.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.dto.ExceptionResponse;
import kr.touroot.travelplan.dto.request.TodoStatusUpdateRequest;
import kr.touroot.travelplan.dto.response.PlanPlaceTodoResponse;
import kr.touroot.travelplan.service.PlaceTodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "여행 계획 장소의 TODO")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/todos")
public class PlaceTodoController {

    private final PlaceTodoService placeTodoService;

    @Operation(summary = "TODO 업데이트")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "요청이 정상적으로 처리되었을 때"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "존재하지 않는 TODO ID로 요청했을 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "작성자가 아닌 사용자가 요청했을 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    @PatchMapping("/{id}")
    public ResponseEntity<PlanPlaceTodoResponse> updateTodo(
            @PathVariable Long id,
            @Valid @RequestBody TodoStatusUpdateRequest updateRequest,
            MemberAuth memberAuth
    ) {
        PlanPlaceTodoResponse updatedTodoResponse = placeTodoService.updateTodoStatus(id, memberAuth, updateRequest);
        return ResponseEntity.ok(updatedTodoResponse);
    }
}
