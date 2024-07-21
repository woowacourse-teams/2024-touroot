package woowacourse.touroot.travelogue.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.URI;
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
import woowacourse.touroot.travelogue.dto.request.TravelogueRequest;
import woowacourse.touroot.travelogue.dto.response.TravelogueResponse;
import woowacourse.touroot.travelogue.service.TravelogueFacadeService;

@Tag(name = "여행기")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/travelogues")
public class TravelogueController {

    private final TravelogueFacadeService travelogueFacadeService;

    @Operation(description = "여행기 작성")
    @PostMapping
    public ResponseEntity<TravelogueResponse> createTravelogue(@Valid @RequestBody TravelogueRequest request) {
        TravelogueResponse response = travelogueFacadeService.createTravelogue(request);

        return ResponseEntity.created(URI.create("/api/v1/travelogues/" + response.id()))
                .body(response);
    }

    @Operation(description = "여행기 상세 조회")
    @GetMapping("/{id}")
    public ResponseEntity<TravelogueResponse> findTravelogue(@Valid @PathVariable Long id) {
        return ResponseEntity.ok(travelogueFacadeService.findTravelogueById(id));
    }

    @Operation(description = "여행기 메인 페이지 조회")
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
