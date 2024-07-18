package woowacourse.touroot.authentication.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import woowacourse.touroot.authentication.infrastructure.KakaoOauthProvider;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final KakaoOauthProvider oauthProvider;

    public String login(String code) {
        return oauthProvider.getUserInformation(code).profileImage();
    }
}
