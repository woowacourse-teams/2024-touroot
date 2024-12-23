package kr.touroot.global;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import kr.touroot.utils.DatabaseCleaner;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional(propagation = Propagation.NOT_SUPPORTED)
@Import(value = {DatabaseCleaner.class})
@Retention(RetentionPolicy.RUNTIME)
@TestPropertySource(properties = {"spring.config.location = classpath:application-test.yml"})
@ActiveProfiles("test")
public @interface ServiceTest {
}
