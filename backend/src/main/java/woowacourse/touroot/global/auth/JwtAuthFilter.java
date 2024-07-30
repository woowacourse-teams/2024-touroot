package woowacourse.touroot.global.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import kr.touroot.authentication.infrastructure.JwtTokenProvider;
import kr.touroot.global.exception.dto.ExceptionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import woowacourse.touroot.global.auth.dto.HttpRequestInfo;

@RequiredArgsConstructor
@Slf4j
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;
    private final JwtTokenProvider tokenProvider;

    private static final List<HttpRequestInfo> WHITE_LIST = List.of(
            new HttpRequestInfo(HttpMethod.GET, "/ping"),
            new HttpRequestInfo(HttpMethod.GET, "/h2-console/**"),
            new HttpRequestInfo(HttpMethod.POST, "/h2-console/**"),
            new HttpRequestInfo(HttpMethod.GET, "/favicon/**"),
            new HttpRequestInfo(HttpMethod.GET, "/swagger-ui/**"),
            new HttpRequestInfo(HttpMethod.GET, "/swagger-resources/**"),
            new HttpRequestInfo(HttpMethod.GET, "/v3/api-docs/**"),
            new HttpRequestInfo(HttpMethod.GET, "/api/v1/travelogues/**"),
            new HttpRequestInfo(HttpMethod.GET, "/api/v1/travel-plans/**"),
            new HttpRequestInfo(HttpMethod.POST, "/api/v1/login/**")
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (token == null) {
            sendUnauthorizedResponse(response, "로그인을 해주세요.");
            return;
        }

        token = token.split("Bearer|bearer")[1];
        try {
            String memberId = tokenProvider.decode(token);
            request.setAttribute("memberId", memberId);
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            sendUnauthorizedResponse(response, e.getMessage());
        }
    }

    private void sendUnauthorizedResponse(HttpServletResponse response, String message) throws IOException {
        ExceptionResponse errorResponse = new ExceptionResponse(message);

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter()
                .write(objectMapper.writeValueAsString(errorResponse));
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
