package kr.touroot.tag.dto;

import jakarta.validation.constraints.NotEmpty;
import kr.touroot.tag.domain.Tag;

public record TagCreateRequest(@NotEmpty(message = "태그는 비어있을 수 없습니다.") String tag) {

    public Tag toTag() {
        return new Tag(tag);
    }
}
