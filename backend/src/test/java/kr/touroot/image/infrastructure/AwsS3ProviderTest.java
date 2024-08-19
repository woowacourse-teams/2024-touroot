package kr.touroot.image.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import kr.touroot.global.AcceptanceTest;
import kr.touroot.global.exception.S3UploadException;
import kr.touroot.image.domain.ImageFile;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

@AcceptanceTest
class AwsS3ProviderTest {

    private final AwsS3Provider s3Provider;
    private final String temporaryStoragePath;
    private final String imageStoragePath;

    public AwsS3ProviderTest(
            @Autowired AwsS3Provider s3Provider,
            @Value("${cloud.aws.s3.temporary-storage-path}") String temporaryStoragePath,
            @Value("${cloud.aws.s3.image-storage-path}") String imageStoragePath
    ) {
        this.s3Provider = s3Provider;
        this.temporaryStoragePath = temporaryStoragePath;
        this.imageStoragePath = imageStoragePath;
    }

    @DisplayName("유효한 url을 통해 이미지를 영구 폴더로 복사하면 새로운 url을 반환한다.")
    @Test
    void copyImageToPermanentStorage() {
        MultipartFile multipartFile = new MockMultipartFile(
                "file",
                "test-image.png",
                "image/png",
                "test image content".getBytes()
        );
        String temporaryUrl = s3Provider.uploadImages(List.of(new ImageFile(multipartFile)))
                .get(0);
        String imageUrl = temporaryUrl.replace(temporaryStoragePath, imageStoragePath);

        assertThat(s3Provider.copyImageToPermanentStorage(temporaryUrl))
                .isEqualTo(imageUrl);
    }

    @DisplayName("url이 올바른 버킷명과 폴더명으로 시작하지 않으면 예외를 발생한다.")
    @Test
    void copyImageToPermanentStorageWithInvalidPath() {
        String imageUrl = "invalid/testUrl.png";
        assertThatThrownBy(() -> s3Provider.copyImageToPermanentStorage(imageUrl))
                .isInstanceOf(S3UploadException.class)
                .hasMessage("S3 이미지 url 형식이 잘못되었습니다.");
    }
}
