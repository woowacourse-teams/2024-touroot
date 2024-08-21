package kr.touroot.tag.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.touroot.tag.domain.Tag;
import lombok.Builder;

@Builder
public record TagResponse(
        @Schema(description = "생성된 태그의 id", example = "1") Long id,
        @Schema(description = "생성된 태그의 내용", example = "신나는 강아지 산책") String tag
) {

    public static TagResponse from(Tag tag) {
        return TagResponse.builder()
                .id(tag.getId())
                .tag(tag.getTag())
                .build();
    }
}
