package kr.touroot.member.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record ProfileUpdateRequest(
        @Schema(description = "사용자 닉네임", example = "아기뚜리")
        @NotBlank(message = "닉네임은 비어있을 수 없습니다.")
        String nickname,
        @Schema(description = "사용자 프로필 사진 URL", example = "https://dev.touroot.kr/profile-image-ex.png")
        @NotBlank(message = "프로필 사진 URL은 비어있을 수 없습니다.")
        String profileImageUrl
) {
}
