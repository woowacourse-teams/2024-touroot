package woowacourse.touroot.authentication.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import woowacourse.touroot.member.domain.Member;

public record LoginResponse(
        @Schema(description = "로그인된 유저의 닉네임") String nickname,
        @Schema(description = "로그인된 유저의 프로필 이미지 경로") String profileImageUrl,
        @Schema(description = "인가에 필요한 accessToken") String accessToken) {

    public static LoginResponse of(Member member, String accessToken) {
        return new LoginResponse(member.getNickname(), member.getProfileImageUri(), accessToken);
    }
}
