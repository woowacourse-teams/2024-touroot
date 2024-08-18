package kr.touroot.global.config;

import io.findify.s3mock.S3Mock;
import java.net.URI;
import java.util.Random;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import software.amazon.awssdk.auth.credentials.AnonymousCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CreateBucketRequest;

@Configuration
public class EmbeddedS3Config {

    private static final int DYNAMIC_PORT_NUMBER_LOWER = 49152;
    private static final int DYNAMIC_PORT_NUMBER_RANGE = 16384;

    private final String bucketName;
    private final int port;

    public EmbeddedS3Config(@Value("${cloud.aws.s3.bucket}") String bucketName) {
        this.bucketName = bucketName;
        this.port = getRandomPortNumber();
    }

    private int getRandomPortNumber() {
        Random random = new Random();
        return random.nextInt(DYNAMIC_PORT_NUMBER_RANGE) + DYNAMIC_PORT_NUMBER_LOWER;
    }

    @Bean(name = "s3Mock", initMethod = "start", destroyMethod = "shutdown")
    public S3Mock s3Mock() {
        return new S3Mock.Builder()
                .withPort(port)
                .withInMemoryBackend()
                .build();
    }

    @DependsOn({"s3Mock"})
    @Bean(name = "s3Client", destroyMethod = "close")
    public S3Client s3Client() {
        S3Client s3Client = S3Client.builder()
                .forcePathStyle(true)
                .credentialsProvider(AnonymousCredentialsProvider.create())
                .region(Region.AP_NORTHEAST_2)
                .endpointOverride(URI.create("http://localhost:" + port))
                .build();

        createLocalBucket(s3Client);
        return s3Client;
    }

    private void createLocalBucket(S3Client s3Client) {
        CreateBucketRequest createBucketRequest = CreateBucketRequest.builder()
                .bucket(bucketName)
                .build();

        s3Client.createBucket(createBucketRequest);
    }
}
