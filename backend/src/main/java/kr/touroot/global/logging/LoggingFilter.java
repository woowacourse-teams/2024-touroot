package kr.touroot.global.logging;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.touroot.global.auth.JwtAuthFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Slf4j
@Component
public class LoggingFilter extends OncePerRequestFilter {

    private static final List<woowacourse.touroot.global.auth.dto.HttpRequestInfo> WHITE_LIST = List.of(
            new woowacourse.touroot.global.auth.dto.HttpRequestInfo(HttpMethod.GET, "/h2-console/**"),
            new woowacourse.touroot.global.auth.dto.HttpRequestInfo(HttpMethod.POST, "/h2-console/**"),
            new woowacourse.touroot.global.auth.dto.HttpRequestInfo(HttpMethod.GET, "/favicon/**"),
            new woowacourse.touroot.global.auth.dto.HttpRequestInfo(HttpMethod.GET, "/swagger-ui/**"),
            new woowacourse.touroot.global.auth.dto.HttpRequestInfo(HttpMethod.GET, "/swagger-resources/**"),
            new woowacourse.touroot.global.auth.dto.HttpRequestInfo(HttpMethod.GET, "/v3/api-docs/**"),
            new woowacourse.touroot.global.auth.dto.HttpRequestInfo(HttpMethod.OPTIONS, "/**")
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String method = request.getMethod();
        String url = request.getRequestURI();
        HttpStatus statusCode = HttpStatus.valueOf(response.getStatus());
        Object memberId = request.getAttribute(JwtAuthFilter.MEMBER_ID_ATTRIBUTE);

        if (memberId == null) {
            log.info("{} {} ({})", method, url, statusCode);
            filterChain.doFilter(request, response);
            return;
        }

        log.info("{} {} ({}) :: userId = {}", method, url, statusCode, method);
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        AntPathMatcher antPathMatcher = new AntPathMatcher();

        String url = request.getRequestURI();
        String method = request.getMethod();

        return WHITE_LIST.stream()
                .anyMatch(white -> white.method().matches(method) && antPathMatcher.match(white.urlPattern(), url));
    }
}
