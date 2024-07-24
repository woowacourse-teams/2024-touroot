package woowacourse.touroot.image.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import woowacourse.touroot.global.exception.dto.ExceptionResponse;
import woowacourse.touroot.image.service.ImageService;

@Tag(name = "이미지")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/image")
public class ImageController {

    private final ImageService imageService;

    @Operation(summary = "이미지 업로드")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "400",
                    description = "jpg, jpeg, png, webp가 아닌 확장자의 파일을 업로드할 때",
                    content = @Content(schema = @Schema(implementation = ExceptionResponse.class))
            )
    })
    @PostMapping
    public ResponseEntity<List<String>> uploadImages(@RequestPart List<MultipartFile> files) {
        List<String> imageUrls = imageService.uploadImages(files);
        return ResponseEntity.ok(imageUrls);
    }
}
