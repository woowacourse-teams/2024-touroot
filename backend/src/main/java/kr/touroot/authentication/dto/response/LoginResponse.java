package kr.touroot.authentication.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.touroot.member.domain.Member;

public record LoginResponse(
        @Schema(description = "로그인된 유저의 닉네임", example = "리비") String nickname,
        @Schema(description = "로그인된 유저의 프로필 이미지 경로", example = "https://img-ul") String profileImageUrl,
        @Schema(description = "투룻 서비스 인가용 accessToken", example = "accessTokenValue") String accessToken) {

    public static LoginResponse of(Member member, String accessToken) {
        return new LoginResponse(member.getNickname(), member.getProfileImageUri(), accessToken);
    }
}
