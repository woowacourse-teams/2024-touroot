package kr.touroot.global.config;

import java.net.URI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
@Profile("test")
public class S3TestConfig {

    private final String s3AccessKey;
    private final String s3SecretKey;
    private final String s3Endpoint;

    public S3TestConfig(
            @Value("${cloud.aws.s3.access-key}") String s3AccessKey,
            @Value("${cloud.aws.s3.secret-key}") String s3SecretKey,
            @Value("${cloud.aws.s3.endpoint}") String s3Endpoint
    ) {
        this.s3AccessKey = s3AccessKey;
        this.s3SecretKey = s3SecretKey;
        this.s3Endpoint = s3Endpoint;
    }

    @Bean(name = "s3Client", destroyMethod = "close")
    public S3Client s3Client() {
        AwsBasicCredentials awsBasicCredentials = AwsBasicCredentials.create(s3AccessKey, s3SecretKey);

        return S3Client.builder()
                .region(Region.AP_NORTHEAST_2)
                .endpointOverride(URI.create(s3Endpoint))
                .credentialsProvider(StaticCredentialsProvider.create(awsBasicCredentials))
                .build();
    }
}
