package kr.touroot.tag.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import kr.touroot.tag.dto.TagResponse;
import kr.touroot.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "태그")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/tags")
public class TagController {

    private final TagService tagService;

    @Operation(summary = "모든 태그 조회")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "태그가 조회가 정상적으로 성공했을 때"
            )
    })
    @GetMapping
    public ResponseEntity<List<TagResponse>> readTags() {
        List<TagResponse> data = tagService.readTags();
        return ResponseEntity.ok(data);
    }
}
