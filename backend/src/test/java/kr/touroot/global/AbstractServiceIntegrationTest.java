package kr.touroot.global;

import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@SpringBootTest(webEnvironment = WebEnvironment.NONE)
public abstract class AbstractServiceIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    protected DatabaseCleaner databaseCleaner;

    @BeforeEach
    protected void baseSetUp() {
        databaseCleaner.executeTruncate();
    }
}
