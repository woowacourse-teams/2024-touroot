package woowacourse.touroot.image.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import woowacourse.touroot.global.exception.BadRequestException;
import woowacourse.touroot.image.infrastructure.AwsS3Provider;

@RequiredArgsConstructor
@Service
public class ImageService {

    private static final List<String> WHITE_LIST = List.of("jpg", "jpeg", "png", "webp");

    private final AwsS3Provider s3Provider;

    public List<String> uploadImages(List<MultipartFile> files) {
        validateImageNames(files);
        return s3Provider.uploadFiles(files);
    }

    private void validateImageNames(List<MultipartFile> files) {
        files.forEach(file -> {
            String fileName = file.getOriginalFilename();
            validateNotNull(fileName);
            validateExtension(fileName);
        });
    }

    private void validateNotNull(String fileName) {
        if (fileName == null) {
            throw new BadRequestException("파일 형식이 잘못되었습니다.");
        }
    }

    public void validateExtension(String fileName) {
        int extensionIndex = fileName.lastIndexOf(".");
        if (extensionIndex == -1) {
            throw new BadRequestException("파일 형식이 잘못되었습니다.");
        }
        String extension = fileName.substring(extensionIndex + 1);
        if (!WHITE_LIST.contains(extension)) {
            throw new BadRequestException("파일 형식이 잘못되었습니다.");
        }
    }
}
