package kr.touroot.tag;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.URI;
import kr.touroot.global.exception.dto.ExceptionResponse;
import kr.touroot.tag.dto.TagCreateRequest;
import kr.touroot.tag.dto.TagResponse;
import kr.touroot.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "태그")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/tag")
public class TagController {

    private final TagService tagService;

    @Operation(summary = "태그 생성")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "태그가 생성이 정상적으로 성공했을 때"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Body에 유효하지 않은 값이 존재하지 않거나 중복된 태그가 존재할 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    @PostMapping
    public ResponseEntity<TagResponse> createTag(@Valid @RequestBody TagCreateRequest request) {
        TagResponse data = tagService.createTag(request);
        return ResponseEntity.created(URI.create("/api/v1/tag/" + data.id()))
                .body(data);
    }
}
