package kr.touroot.global;

import java.io.IOException;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.containers.localstack.LocalStackContainer;
import org.testcontainers.containers.localstack.LocalStackContainer.Service;
import org.testcontainers.utility.DockerImageName;

public abstract class IntegrationTest {

    private static final DockerImageName MYSQL_IMAGE_NAME = DockerImageName.parse("mysql:8");
    private static final DockerImageName LOCALSTACK_IMAGE_NAME = DockerImageName.parse("localstack/localstack");
    private static final String S3_BUCKET_NAME = "test-bucket";

    private static final MySQLContainer<?> mySQLContainer;
    private static final LocalStackContainer localStackContainer;

    static {
        mySQLContainer = new MySQLContainer<>(MYSQL_IMAGE_NAME);
        localStackContainer = new LocalStackContainer(LOCALSTACK_IMAGE_NAME).withServices(Service.S3);

        mySQLContainer.start();
        localStackContainer.start();

        createS3Bucket();
    }

    private static void createS3Bucket() {
        try {
            localStackContainer.execInContainer("awslocal", "s3", "mb", "s3://" + S3_BUCKET_NAME);
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("S3 버킷을 생성하던 중 오류가 발생했습니다.");
        }
    }

    @DynamicPropertySource
    private static void dynamicProperties(DynamicPropertyRegistry registry) {
        // add MySQL Properties
        registry.add("spring.datasource.url", mySQLContainer::getJdbcUrl);
        registry.add("spring.datasource.driver-class-name", mySQLContainer::getDriverClassName);
        registry.add("spring.datasource.username", mySQLContainer::getUsername);
        registry.add("spring.datasource.password", mySQLContainer::getPassword);

        // add S3 Properties
        registry.add("cloud.aws.s3.access-key", localStackContainer::getAccessKey);
        registry.add("cloud.aws.s3.secret-key", localStackContainer::getSecretKey);
        registry.add("cloud.aws.s3.endpoint", () -> localStackContainer.getEndpointOverride(Service.S3));
    }
}
