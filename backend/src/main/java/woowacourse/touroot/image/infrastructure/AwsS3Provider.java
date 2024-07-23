package woowacourse.touroot.image.infrastructure;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.InstanceProfileCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import woowacourse.touroot.global.exception.BadRequestException;

@Component
public class AwsS3Provider {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.s3.directory-path}")
    private String directoryPath;

    public List<String> uploadFiles(List<MultipartFile> files) {
        List<String> urls = new ArrayList<>();

        try (S3Client s3Client = getS3Client()) {
            files.forEach(file -> {
                String filePath = createFileName(file.getOriginalFilename());
                uploadFile(file, filePath, s3Client);
                urls.add(getFileUrl(filePath, s3Client));
            });
            return urls;
        }
    }

    private S3Client getS3Client() {
        return S3Client.builder()
                .region(Region.AP_NORTHEAST_2)
                .credentialsProvider(InstanceProfileCredentialsProvider.create())
                .build();
    }

    private void uploadFile(MultipartFile file, String filePath, S3Client s3Client) {
        try {
            RequestBody requestBody = RequestBody.fromBytes(file.getBytes());
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(createFileName(filePath))
                    .build();

            s3Client.putObject(putObjectRequest, requestBody);
        } catch (IOException e) {
            throw new BadRequestException("파일 저장에 실패했습니다.");
        }
    }

    private String getFileUrl(String filePath, S3Client s3Client) {
        return s3Client.utilities()
                .getUrl(builder -> builder.bucket(bucket).key(filePath))
                .toString();
    }

    private String createFileName(String fileName) {
        if (fileName == null) {
            throw new BadRequestException("파일 형식이 잘못되었습니다.");
        }
        return directoryPath + UUID.randomUUID() + fileName.substring(fileName.lastIndexOf("."));
    }
}
