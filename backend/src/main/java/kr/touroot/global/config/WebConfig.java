package kr.touroot.global.config;

import java.util.List;
import kr.touroot.global.auth.MemberAuthMethodArgumentResolver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final MemberAuthMethodArgumentResolver memberAuthMethodArgumentResolver;
    private final String[] allowedOrigins;

    public WebConfig(
            MemberAuthMethodArgumentResolver memberAuthMethodArgumentResolver,
            @Value("${cors.allowed-origins}") String[] allowedOrigins
    ) {
        this.memberAuthMethodArgumentResolver = memberAuthMethodArgumentResolver;
        this.allowedOrigins = allowedOrigins;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(memberAuthMethodArgumentResolver);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS")
                .exposedHeaders(HttpHeaders.LOCATION);
    }
}
