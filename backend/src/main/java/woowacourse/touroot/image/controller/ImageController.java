package woowacourse.touroot.image.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import woowacourse.touroot.image.service.ImageService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/image")
public class ImageController {

    private final ImageService imageService;

    @PostMapping
    public ResponseEntity<List<String>> uploadImages(@RequestPart List<MultipartFile> files) {
        List<String> imageUrls = imageService.uploadImages(files);
        return ResponseEntity.ok(imageUrls);
    }
}
