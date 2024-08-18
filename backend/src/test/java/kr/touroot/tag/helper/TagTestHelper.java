package kr.touroot.tag.helper;

import kr.touroot.tag.domain.Tag;
import kr.touroot.tag.fixture.TagFixture;
import kr.touroot.tag.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TagTestHelper {

    private final TagRepository tagRepository;

    @Autowired
    public TagTestHelper(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public Tag initTagData() {
        Tag tag = TagFixture.TAG_1.get();;
        return tagRepository.save(tag);
    }

    public Tag initTagData(Tag tag) {
        return tagRepository.save(tag);
    }
}
