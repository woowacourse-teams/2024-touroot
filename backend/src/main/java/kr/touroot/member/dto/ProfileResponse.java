package kr.touroot.member.dto;

import kr.touroot.member.domain.Member;
import lombok.Builder;

@Builder
public record ProfileResponse(String profileImageUrl, String nickname) {

    public static ProfileResponse from(Member member) {
        return ProfileResponse.builder()
                .profileImageUrl(member.getProfileImageUrl())
                .nickname(member.getNickname())
                .build();
    }
}
