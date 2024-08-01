package kr.touroot.member.dto;

import kr.touroot.member.domain.Member;
import lombok.Builder;

@Builder
public record ProfileReadResponse(String profileImageUrl, String nickname) {

    public static ProfileReadResponse from(Member member) {
        return ProfileReadResponse.builder()
                .profileImageUrl(member.getProfileImageUrl())
                .nickname(member.getNickname())
                .build();
    }
}
