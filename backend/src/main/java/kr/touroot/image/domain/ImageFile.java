package kr.touroot.image.domain;

import java.util.List;
import kr.touroot.global.exception.BadRequestException;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class ImageFile {

    private static final List<String> WHITE_LIST = List.of("jpg", "jpeg", "png", "webp", "heic");

    private final MultipartFile file;

    public ImageFile(MultipartFile file) {
        validate(file);
        this.file = file;
    }

    private void validate(MultipartFile file) {
        validateNotNull(file);
        String fileName = file.getOriginalFilename();
        validateFileNameNotBlank(fileName);
        validateExtension(fileName);
    }

    private void validateNotNull(MultipartFile file) {
        if (file == null) {
            throw new BadRequestException("파일을 전달 받지 못했습니다");
        }
    }

    private void validateFileNameNotBlank(String fileName) {
        if (fileName == null || fileName.isBlank()) {
            throw new BadRequestException("파일 이름은 비어있을 수 없습니다");
        }
    }

    public void validateExtension(String fileName) {
        int extensionIndex = fileName.lastIndexOf(".");
        if (extensionIndex == -1 || fileName.endsWith(".")) {
            throw new BadRequestException("파일 형식이 잘못되었습니다");
        }
        String extension = fileName.substring(extensionIndex + 1);
        if (!WHITE_LIST.contains(extension.toLowerCase())) {
            throw new BadRequestException("지원하지 않는 확장자입니다: " + extension);
        }
    }
}
