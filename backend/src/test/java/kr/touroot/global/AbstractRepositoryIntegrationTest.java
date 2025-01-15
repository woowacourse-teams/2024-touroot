package kr.touroot.global;

import kr.touroot.global.config.TestQueryDslConfig;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({TestQueryDslConfig.class, DatabaseCleaner.class})
public abstract class AbstractRepositoryIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    private DatabaseCleaner databaseCleaner;

    @BeforeEach
    protected void baseSetUp() {
        databaseCleaner.executeTruncate();
    }
}
