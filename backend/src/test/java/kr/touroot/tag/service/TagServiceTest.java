package kr.touroot.tag.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.ServiceTest;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.tag.domain.Tag;
import kr.touroot.tag.dto.TagCreateRequest;
import kr.touroot.tag.fixture.TagFixture;
import kr.touroot.tag.helper.TagTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

@DisplayName("태그 서비스")
@Import(value = {TagService.class, TagTestHelper.class})
@ServiceTest
class TagServiceTest {

    private final DatabaseCleaner databaseCleaner;
    private final TagTestHelper testHelper;
    private final TagService tagService;

    @Autowired
    public TagServiceTest(DatabaseCleaner databaseCleaner, TagTestHelper testHelper, TagService tagService) {
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
        this.tagService = tagService;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

    @DisplayName("태그 서비스는 중복된 태그 생성 요청시 예외가 발생한다.")
    @Test
    void validateDuplicated() {
        // given
        Tag tag = TagFixture.TAG_1.get();
        testHelper.initTagData(tag);
        TagCreateRequest request = new TagCreateRequest(tag.getTag());

        // when & then
        assertThatThrownBy(() -> tagService.createTag(request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("이미 존재하는 태그입니다.");
    }
}
