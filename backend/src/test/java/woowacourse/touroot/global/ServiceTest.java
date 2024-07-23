package woowacourse.touroot.global;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest(webEnvironment = WebEnvironment.NONE)
@Retention(RetentionPolicy.RUNTIME)
@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
public @interface ServiceTest {
}
