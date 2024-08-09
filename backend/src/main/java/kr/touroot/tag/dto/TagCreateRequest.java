package kr.touroot.tag.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import kr.touroot.tag.domain.Tag;

public record TagCreateRequest(
        @Schema(description = "태그 이름", example = "강아지와 함께")
        @NotEmpty(message = "태그는 비어있을 수 없습니다.") String tag
) {

    public Tag toTag() {
        return new Tag(tag);
    }
}
