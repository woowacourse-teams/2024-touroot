package kr.touroot.member.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record ProfileUpdateRequest(
        @Schema(description = "사용자 닉네임", example = "아기뚜리")
        String nickname,
        @Schema(description = "사용자 프로필 사진 URL", example = "https://dev.touroot.kr/profile-image-ex.png")
        String profileImageUrl
) {
}
