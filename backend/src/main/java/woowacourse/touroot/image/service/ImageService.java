package woowacourse.touroot.image.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import woowacourse.touroot.image.domain.ImageFile;
import woowacourse.touroot.image.infrastructure.AwsS3Provider;

@RequiredArgsConstructor
@Service
public class ImageService {

    private final AwsS3Provider s3Provider;

    public List<String> uploadImages(List<MultipartFile> files) {
        List<ImageFile> imageFiles = files.stream()
                .map(ImageFile::new)
                .toList();
        return s3Provider.uploadImages(imageFiles);
    }
}
