package kr.touroot.global.auth;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Objects;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.UnauthorizedException;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class MemberAuthMethodArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().equals(MemberAuth.class);
    }

    @Override
    public Object resolveArgument(
            MethodParameter parameter,
            ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest,
            WebDataBinderFactory binderFactory
    ) throws Exception {
        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        String memberId = Objects.requireNonNull(request).getAttribute("memberId").toString();

        if (memberId == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }

        return new MemberAuth(Long.valueOf(memberId));
    }
}
