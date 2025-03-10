package kr.touroot.travelogue.repository.query;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import kr.touroot.global.AbstractRepositoryIntegrationTest;
import kr.touroot.tag.domain.Tag;
import kr.touroot.tag.fixture.TagFixture;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueFilterCondition;
import kr.touroot.travelogue.domain.search.SearchCondition;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@DisplayName("TravelogueQueryRepositoryImpl 테스트")
class TravelogueQueryRepositoryImplTest extends AbstractRepositoryIntegrationTest {

    @Autowired
    private TravelogueQueryRepository travelogueQueryRepository;
    @Autowired
    private TravelogueTestHelper testHelper;

    @DisplayName("필터링된 여행기 목록을 조회한다.")
    @Test
    void filterTravelogues() {
        // given
        Tag tag1 = testHelper.initTagTestData(TagFixture.TAG_1.get());
        Tag tag2 = testHelper.initTagTestData(TagFixture.TAG_2.get());
        testHelper.initAllTravelogueTestData(List.of(tag1, tag2));
        PageRequest pageRequest = PageRequest.of(0, 5, Sort.by("like_count").descending());
        TravelogueFilterCondition filterCondition = new TravelogueFilterCondition(List.of(1L, 2L), null);
        SearchCondition searchCondition = new SearchCondition(null, null);

        // when
        Page<Travelogue> result =
                travelogueQueryRepository.findAllByCondition(searchCondition, filterCondition, pageRequest);

        // then
        assertThat(result.getContent()).hasSize(1);
    }

}
