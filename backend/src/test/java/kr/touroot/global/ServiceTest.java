package kr.touroot.global;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import kr.touroot.utils.DatabaseCleaner;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@DataJpaTest
@Transactional(propagation = Propagation.NOT_SUPPORTED)
@Import(value = {DatabaseCleaner.class})
@Retention(RetentionPolicy.RUNTIME)
@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
public @interface ServiceTest {
}
