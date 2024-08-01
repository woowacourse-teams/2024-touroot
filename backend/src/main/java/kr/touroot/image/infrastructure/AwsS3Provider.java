package kr.touroot.image.infrastructure;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.image.domain.ImageFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.InstanceProfileCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CopyObjectRequest;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Component
public class AwsS3Provider {

    private final String bucket;
    private final String imageBaseUri;
    private final String tourootStoragePath;
    private final String temporaryStoragePath;
    private final String imageStoragePath;

    public AwsS3Provider(
            @Value("${cloud.aws.s3.bucket}") String bucket,
            @Value("${cloud.aws.s3.image-base-uri}") String imageBaseUri,
            @Value("${cloud.aws.s3.base-storage-path}") String tourootStoragePath,
            @Value("${cloud.aws.s3.temporary-storage-path}") String temporaryStoragePath,
            @Value("${cloud.aws.s3.image-storage-path}") String imageStoragePath
    ) {
        this.bucket = bucket;
        this.imageBaseUri = imageBaseUri;
        this.tourootStoragePath = tourootStoragePath;
        this.temporaryStoragePath = temporaryStoragePath;
        this.imageStoragePath = imageStoragePath;
    }

    public List<String> uploadImages(List<ImageFile> files) {
        List<String> urls = new ArrayList<>();

        try (S3Client s3Client = getS3Client()) {
            files.stream()
                    .map(ImageFile::getFile)
                    .forEach(file -> {
                        String newFileName = createNewFileName(file.getOriginalFilename());
                        String filePath = tourootStoragePath + temporaryStoragePath + newFileName;
                        uploadFile(file, filePath, s3Client);
                        String s3Key = imageBaseUri + temporaryStoragePath + newFileName;
                        urls.add(s3Key);
                    });
            return urls;
        }
    }

    private String createNewFileName(String fileName) {
        return UUID.randomUUID() + fileName.substring(fileName.lastIndexOf("."));
    }

    S3Client getS3Client() {
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

    public String copyImageToPermanentStorage(String imageUrl) {
        validateS3Path(imageUrl);
        String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        String sourceKey = tourootStoragePath + temporaryStoragePath + fileName;
        String destinationKey = sourceKey.replace(temporaryStoragePath, imageStoragePath);
        copyFile(sourceKey, destinationKey);
        return imageUrl.replace(temporaryStoragePath, imageStoragePath);
    }

    private void validateS3Path(String imageKey) {
        if (!imageKey.startsWith(imageBaseUri + temporaryStoragePath)) {
            throw new BadRequestException("이미지 url 형식이 잘못되었습니다.");
        }
    }

    private void copyFile(String sourceKey, String destinationKey) {
        try (S3Client s3Client = getS3Client()) {
            CopyObjectRequest request = CopyObjectRequest.builder()
                    .sourceBucket(bucket)
                    .sourceKey(sourceKey)
                    .destinationBucket(bucket)
                    .destinationKey(destinationKey)
                    .build();

            s3Client.copyObject(request);
        } catch (NoSuchKeyException e) {
            throw new BadRequestException("복사하려는 사진이 존재하지 않습니다.");
        }
    }
}
