package woowacourse.touroot.global.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI createOpenApi() {
        return new OpenAPI()
                .info(getInfo());
    }

    private Info getInfo() {
        return new Info()
                .title("touroot API")
                .description("To your route, 투룻 API")
                .version("0.1");
    }
}
