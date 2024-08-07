package kr.touroot.authentication.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @Schema(description = "사용자 이메일", example = "email@gmail.com")
        @NotBlank(message = "이메일은 비어있을 수 없습니다.")
        @Email
        String email,
        @Schema(description = "사용자 비밀번호", example = "@testpassword1234")
        @NotBlank(message = "비밀번호는 비어있을 수 없습니다.")
        String password
) {
}
