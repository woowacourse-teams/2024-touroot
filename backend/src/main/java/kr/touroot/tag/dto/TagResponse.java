package kr.touroot.tag.dto;

import kr.touroot.tag.domain.Tag;
import lombok.Builder;

@Builder
public record TagResponse(Long id, String tag) {

    public static TagResponse from(Tag tag) {
        return TagResponse.builder()
                .id(tag.getId())
                .tag(tag.getTag())
                .build();
    }
}
