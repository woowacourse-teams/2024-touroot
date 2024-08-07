package kr.touroot.global.auth.dto;

import java.util.List;
import org.springframework.http.HttpMethod;

public record HttpRequestInfo(HttpMethod method, String urlPattern, List<String> headers) {

    public HttpRequestInfo(HttpMethod method, String urlPattern) {
        this(method, urlPattern, List.of());
    }
}
