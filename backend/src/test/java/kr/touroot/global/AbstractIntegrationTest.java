package kr.touroot.global;

import com.redis.testcontainers.RedisContainer;
import java.io.IOException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.TestPropertySource;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.containers.localstack.LocalStackContainer;
import org.testcontainers.containers.localstack.LocalStackContainer.Service;
import org.testcontainers.utility.DockerImageName;

@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
@ActiveProfiles("test")
public abstract class AbstractIntegrationTest {

    private static final DockerImageName MYSQL_IMAGE_NAME = DockerImageName.parse("mysql:8");
    private static final DockerImageName LOCALSTACK_IMAGE_NAME = DockerImageName.parse("localstack/localstack");
    private static final DockerImageName REDIS_IMAGE_NAME = DockerImageName.parse("redis:7.4.1");

    private static final String S3_BUCKET_NAME = "test-bucket";

    private static final MySQLContainer<?> mySQLContainer;
    private static final LocalStackContainer localStackContainer;
    private static final RedisContainer redisContainer;

    static {
        mySQLContainer = new MySQLContainer<>(MYSQL_IMAGE_NAME);
        localStackContainer = new LocalStackContainer(LOCALSTACK_IMAGE_NAME).withServices(Service.S3);
        redisContainer = new RedisContainer(RedisContainer.DEFAULT_IMAGE_NAME.withTag(RedisContainer.DEFAULT_TAG));

        mySQLContainer.start();
        localStackContainer.start();
        redisContainer.start();
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

        // add Redis Properties
        registry.add("spring.data.redis.host", redisContainer::getHost);
        registry.add("spring.data.redis.port", () -> redisContainer.getMappedPort(6379));
    }
}
