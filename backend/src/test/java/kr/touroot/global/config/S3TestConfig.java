package kr.touroot.global.config;

import static org.testcontainers.containers.localstack.LocalStackContainer.Service.S3;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.testcontainers.containers.localstack.LocalStackContainer;
import org.testcontainers.utility.DockerImageName;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CreateBucketRequest;

@Configuration
@Profile("test")
public class S3TestConfig {

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private static final DockerImageName LOCAL_STACK_IMAGE = DockerImageName.parse("localstack/localstack");

    @Bean(initMethod = "start", destroyMethod = "stop")
    public LocalStackContainer localStackContainer() {
        return new LocalStackContainer(LOCAL_STACK_IMAGE).withServices(S3);
    }

    @Bean(name = "s3Client", destroyMethod = "close")
    public S3Client s3Client(LocalStackContainer localStackContainer) {
        StaticCredentialsProvider localStackContainerCredentials = StaticCredentialsProvider.create(
                AwsBasicCredentials.create(localStackContainer.getAccessKey(), localStackContainer.getSecretKey())
        );

        S3Client s3Client = S3Client.builder()
                .region(Region.AP_NORTHEAST_2)
                .endpointOverride(localStackContainer.getEndpointOverride(S3))
                .credentialsProvider(localStackContainerCredentials)
                .build();
        s3Client.createBucket(CreateBucketRequest.builder().bucket(bucketName).build());
        return s3Client;
    }
}
