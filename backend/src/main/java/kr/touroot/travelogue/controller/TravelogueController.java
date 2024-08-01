package kr.touroot.travelogue.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.URI;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.dto.ExceptionResponse;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.dto.response.TravelogueResponse;
import kr.touroot.travelogue.service.TravelogueFacadeService;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.converters.models.PageableAsQueryParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "여행기")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/travelogues")
public class TravelogueController {

    private final TravelogueFacadeService travelogueFacadeService;

    @Operation(summary = "여행기 작성")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "요청이 정상적으로 처리되었을 때"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "요청 Body에 올바르지 않은 값이 전달되었을 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
    })
    @PostMapping
    public ResponseEntity<TravelogueResponse> createTravelogue(
            @Valid MemberAuth member,
            @Valid @RequestBody TravelogueRequest request
    ) {
        TravelogueResponse response = travelogueFacadeService.createTravelogue(member, request);

        return ResponseEntity.created(URI.create("/api/v1/travelogues/" + response.id()))
                .body(response);
    }

    @Operation(summary = "여행기 상세 조회")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "요청이 정상적으로 처리되었을 때"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "존재하지 않는 여행기 ID로 요청했을 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
    })
    @GetMapping("/{id}")
    public ResponseEntity<TravelogueResponse> findTravelogue(@PathVariable Long id) {
        return ResponseEntity.ok(travelogueFacadeService.findTravelogueById(id));
    }

    @Operation(summary = "여행기 메인 페이지 조회")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "요청이 정상적으로 처리되었을 때"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "올바르지 않은 페이지네이션 옵션으로 요청했을 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            ),
    })
    @PageableAsQueryParam
    @GetMapping
    public ResponseEntity<Page<TravelogueResponse>> findMainPageTravelogues(
            @Parameter(hidden = true)
            @PageableDefault(size = 5, sort = "id", direction = Direction.DESC)
            Pageable pageable
    ) {
        return ResponseEntity.ok(travelogueFacadeService.findTravelogues(pageable));
    }
}
