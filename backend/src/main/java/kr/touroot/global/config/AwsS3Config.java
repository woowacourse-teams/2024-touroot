package kr.touroot.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import software.amazon.awssdk.auth.credentials.InstanceProfileCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
@Profile({"dev"})
public class AwsS3Config {

    @Primary
    @Bean(name = "s3Client", destroyMethod = "close")
    public S3Client s3Client() {
        return S3Client.builder()
                .region(Region.AP_NORTHEAST_2)
                .credentialsProvider(InstanceProfileCredentialsProvider.create())
                .build();
    }
}
