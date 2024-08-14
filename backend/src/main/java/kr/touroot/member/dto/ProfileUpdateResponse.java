package kr.touroot.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.touroot.member.domain.Member;

public record ProfileUpdateResponse(
        @Schema(description = "프로필을 수정한 멤버의 id", example = "1")
        Long id
) {

    public static ProfileUpdateResponse from(Member member) {
        return new ProfileUpdateResponse(member.getId());
    }
}
