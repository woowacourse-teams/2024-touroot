package kr.touroot.image.infrastructure;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

import kr.touroot.global.AcceptanceTest;
import kr.touroot.global.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = AwsS3Provider.class)
class AwsS3ProviderTest {

    @Autowired
    AwsS3Provider s3Provider;

    @DisplayName("url이 올바른 버킷명과 폴더명으로 시작하지 않으면 예외를 발생한다.")
    @Test
    void copyImageToPermanentStorageWithInvalidPath() {
        String imageUrl = "testUrl";
        assertThatThrownBy(() -> s3Provider.copyImageToPermanentStorage(imageUrl))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("이미지 url 형식이 잘못되었습니다.");
    }
}
