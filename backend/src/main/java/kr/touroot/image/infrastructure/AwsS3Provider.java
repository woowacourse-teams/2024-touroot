package kr.touroot.image.infrastructure;

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
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.image.domain.ImageFile;

@Component
public class AwsS3Provider {

    private final String bucket;
    private final String imageBaseUri;
    private final String directoryPath;

    public AwsS3Provider(
            @Value("${cloud.aws.s3.bucket}") String bucket,
            @Value("${cloud.aws.s3.image-base-uri}") String imageBaseUri,
            @Value("${cloud.aws.s3.directory-path}") String directoryPath
    ) {
        this.bucket = bucket;
        this.imageBaseUri = imageBaseUri;
        this.directoryPath = directoryPath;
    }

    public List<String> uploadImages(List<ImageFile> files) {
        List<String> urls = new ArrayList<>();

        try (S3Client s3Client = getS3Client()) {
            files.stream()
                    .map(ImageFile::getFile)
                    .forEach(file -> {
                        String newFileName = createNewFileName(file.getOriginalFilename());
                        String filePath = directoryPath + newFileName;
                        uploadFile(file, filePath, s3Client);
                        urls.add(imageBaseUri + newFileName);
                    });
            return urls;
        }
    }

    private String createNewFileName(String fileName) {
        return UUID.randomUUID() + fileName.substring(fileName.lastIndexOf("."));
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
                    .key(filePath)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .build();

            s3Client.putObject(putObjectRequest, requestBody);
        } catch (IOException e) {
            throw new BadRequestException("파일 저장에 실패했습니다.");
        }
    }
}
