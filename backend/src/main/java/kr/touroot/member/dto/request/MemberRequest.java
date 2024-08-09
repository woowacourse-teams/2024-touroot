package kr.touroot.member.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import kr.touroot.member.domain.LoginType;
import kr.touroot.member.domain.Member;

public record MemberRequest(
        @Schema(description = "사용자 이메일", example = "email@gmail.com")
        @NotBlank(message = "이메일은 비어있을 수 없습니다.")
        @Email
        String email,
        @Schema(description = "사용자 비밀번호", example = "@testpassword1234")
        @NotBlank(message = "비밀번호는 비어있을 수 없습니다.")
        String password,
        @Schema(description = "사용자 닉네임", example = "뚜리")
        @NotBlank(message = "닉네임은 비어있을 수 없습니다.")
        String nickname,
        @Schema(description = "사용자 프로필 사진 URL", example = "https://dev.touroot.kr/profile-image-ex.png")
        @NotBlank(message = "프로필 사진 URL은 비어있을 수 없습니다.")
        String profileImageUrl
) {

    public Member toMember(String password) {
        return new Member(email, password, nickname, profileImageUrl, LoginType.DEFAULT);
    }
}
