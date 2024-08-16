package kr.touroot.tag.fixture;

import kr.touroot.tag.domain.Tag;
import kr.touroot.tag.dto.TagCreateRequest;
import kr.touroot.tag.dto.TagResponse;

public enum TagFixture {

    TAG_1("강아지와 함께"),
    TAG_2("고양이와 함께"),
    TAG_3("알파카와 함께"),
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

    public TagResponse getResponse(Long id) {
        return new TagResponse(id, tag);
    }
}
