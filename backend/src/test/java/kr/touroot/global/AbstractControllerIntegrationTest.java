package kr.touroot.global;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import kr.touroot.authentication.infrastructure.JwtTokenProvider;
import kr.touroot.utils.DatabaseCleaner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public abstract class AbstractControllerIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    protected DatabaseCleaner databaseCleaner;
    @Autowired
    protected ObjectMapper objectMapper;
    @Autowired
    protected JwtTokenProvider jwtTokenProvider;
    @LocalServerPort
    protected int port;

    protected void setUp() {
        RestAssured.port = port;
        databaseCleaner.executeTruncate();
    }
}
