package kr.touroot.image.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.exception.BadRequestException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

@DisplayName("이미지 파일")
class ImageFileTest {

    private MultipartFile validFile;
    private MultipartFile nullFile;
    private MultipartFile originalFileNameNullFile;
    private MultipartFile notSupportingFile;
    private MultipartFile fileWithNoExtension;

    @BeforeEach
    void setUp() {
        validFile = new MockMultipartFile("file", "image.jpg", "image/jpeg", "image content".getBytes());
        nullFile = null;
        originalFileNameNullFile = new MockMultipartFile("file", null, "text/plain", "image content".getBytes());
        notSupportingFile = new MockMultipartFile("file", "image.txt", "text/plain", "image content".getBytes());
        fileWithNoExtension = new MockMultipartFile("file", "image.", "text/plain", "image content".getBytes());
    }

    @DisplayName("유효한 파일로 이미지 파일 도메인을 생성할 수 있다")
    @Test
    void createImageFileWithValidFile() {
        assertThatCode(() -> new ImageFile(validFile))
                .doesNotThrowAnyException();
    }

    @DisplayName("파일이 null이면 이미지 파일 생성 시에 예외가 발생한다")
    @Test
    void createImageFileWithNullFile() {
        assertThatThrownBy(() -> new ImageFile(nullFile))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("파일을 전달 받지 못했습니다");
    }

    @DisplayName("파일 이름이 비어있는 경우 이미지 파일 생성 시에 예외가 발생한다")
    @Test
    void createImageFileWithOriginalFileNameNullFile() {
        assertThatThrownBy(() -> new ImageFile(originalFileNameNullFile))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("파일 이름은 비어있을 수 없습니다");
    }

    @DisplayName("지원하지 않는 파일 확장자의 이미지 파일을 생성 시에 에외가 발생한다")
    @Test
    void createImageFileWithNotValidExtensionFile() {
        assertThatThrownBy(() -> new ImageFile(notSupportingFile))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("지원하지 않는 확장자입니다: " + "txt");
    }

    @DisplayName("파일 이름 형식이 올바르지 않은 경우 이미지 파일 생성 시에 예외가 발생한다")
    @Test
    void createImageFileWithInvalidFormFile() {
        assertThatThrownBy(() -> new ImageFile(fileWithNoExtension))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("파일 형식이 잘못되었습니다");
    }
}
