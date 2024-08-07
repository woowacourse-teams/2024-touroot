package kr.touroot.tag.fixture;

import kr.touroot.tag.domain.Tag;
import kr.touroot.tag.dto.TagCreateRequest;

public enum TagFixture {

    TAG("강아지와 함께"),
    ;

    private final String tag;

    TagFixture(String tag) {
        this.tag = tag;
    }

    public Tag get() {
        return new Tag(tag);
    }

    public TagCreateRequest getCreateRequest() {
        return new TagCreateRequest(tag);
    }
}
