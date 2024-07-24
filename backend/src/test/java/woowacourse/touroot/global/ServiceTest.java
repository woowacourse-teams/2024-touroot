package woowacourse.touroot.global;

import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import woowacourse.touroot.utils.DatabaseCleaner;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@DataJpaTest
@Import(value = {DatabaseCleaner.class})
@Retention(RetentionPolicy.RUNTIME)
@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
public @interface ServiceTest {
}
