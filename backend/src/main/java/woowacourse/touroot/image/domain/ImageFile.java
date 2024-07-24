package woowacourse.touroot.image.domain;

import java.util.List;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
import woowacourse.touroot.global.exception.BadRequestException;

@Getter
public class ImageFile {

    private static final List<String> WHITE_LIST = List.of("jpg", "jpeg", "png", "webp");

    private final MultipartFile file;

    public ImageFile(MultipartFile file) {
        validateImageNames(file);
        this.file = file;
    }

    private void validateImageNames(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        validateNotNull(fileName);
        validateExtension(fileName);
    }

    private void validateNotNull(String fileName) {
        if (fileName == null) {
            throw new BadRequestException("파일 형식이 잘못되었습니다.");
        }
    }

    public void validateExtension(String fileName) {
        int extensionIndex = fileName.lastIndexOf(".");
        if (extensionIndex == -1 || fileName.endsWith(".")) {
            throw new BadRequestException("파일 형식이 잘못되었습니다.");
        }
        String extension = fileName.substring(extensionIndex + 1);
        if (!WHITE_LIST.contains(extension)) {
            throw new BadRequestException("파일 형식이 잘못되었습니다.");
        }
    }
}
