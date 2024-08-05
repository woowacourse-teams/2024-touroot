package kr.touroot.image.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import kr.touroot.global.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CopyObjectRequest;
import software.amazon.awssdk.services.s3.model.CopyObjectResponse;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = AwsS3Provider.class)
class AwsS3ProviderTest {

    @MockBean
    private S3Client s3Client;

    @SpyBean
    private AwsS3Provider s3Provider;

    @Value("${cloud.aws.s3.image-base-uri}")
    private String imageBaseUri;
    @Value("${cloud.aws.s3.temporary-storage-path}")
    private String temporaryStoragePath;
    @Value("${cloud.aws.s3.image-storage-path}")
    private String imageStoragePath;

    @DisplayName("유효한 url을 통해 이미지를 영구 폴더로 복사하면 새로운 url을 반환한다.")
    @Test
    void copyImageToPermanentStorage() {
        when(s3Provider.getS3Client())
                .thenReturn(s3Client);
        when(s3Client.copyObject(any(CopyObjectRequest.class)))
                .thenReturn(CopyObjectResponse.builder().build());

        String temporaryUrl = imageBaseUri + temporaryStoragePath + "valid.png";
        String imageUrl = imageBaseUri + imageStoragePath + "valid.png";
        assertThat(s3Provider.copyImageToPermanentStorage(temporaryUrl))
                .isEqualTo(imageUrl);
    }

    @DisplayName("url이 올바른 버킷명과 폴더명으로 시작하지 않으면 예외를 발생한다.")
    @Test
    void copyImageToPermanentStorageWithInvalidPath() {
        String imageUrl = "invalid/testUrl.png";
        assertThatThrownBy(() -> s3Provider.copyImageToPermanentStorage(imageUrl))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("S3 이미지 url 형식이 잘못되었습니다.");
    }
}
