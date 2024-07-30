package woowacourse.touroot.authentication.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import woowacourse.touroot.authentication.dto.response.LoginResponse;
import woowacourse.touroot.authentication.service.LoginService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Disabled
@WebMvcTest(LoginController.class)
class LoginControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private LoginService loginService;

    @DisplayName("카카오 로그인 요청을 처리할 수 있다")
    @Test
    void loginTest() throws Exception {
        LoginResponse loginResponse = new LoginResponse("리비", "img-url", "test-access-token");
        when(loginService.login(any(String.class))).thenReturn(loginResponse);

        mockMvc.perform(post("/api/v1/login/oauth/kakao")
                        .param("code", "test-authorization-code"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(loginResponse)));
    }
}
