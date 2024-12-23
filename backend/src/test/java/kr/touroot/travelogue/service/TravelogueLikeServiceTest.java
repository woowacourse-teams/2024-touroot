package kr.touroot.travelogue.service;

import static org.assertj.core.api.Assertions.assertThat;

import kr.touroot.global.IntegrationTest;
import kr.touroot.global.ServiceTest;
import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Pageable;

@DisplayName("여행기 좋아요 서비스")
@Import(value = {TravelogueLikeService.class, TravelogueTestHelper.class})
@ServiceTest
class TravelogueLikeServiceTest extends IntegrationTest {

    public static final int BASIC_PAGE_SIZE = 5;

    private final TravelogueLikeService travelogueLikeService;
    private final DatabaseCleaner databaseCleaner;
    private final TravelogueTestHelper testHelper;

    @Autowired
    public TravelogueLikeServiceTest(
            TravelogueLikeService travelogueLikeService,
            DatabaseCleaner databaseCleaner,
            TravelogueTestHelper testHelper
    ) {
        this.travelogueLikeService = travelogueLikeService;
        this.databaseCleaner = databaseCleaner;
        this.testHelper = testHelper;
    }

    @BeforeEach
    void setUp() {
        databaseCleaner.executeTruncate();
    }

    @DisplayName("특정 멤버가 좋아요 한 여행기를 조회할 수 있다.")
    @Test
    void findByLiker() {
        // given
        Member liker = testHelper.initKakaoMemberTestData();
        testHelper.initTravelogueTestDataWithLike(liker);
        testHelper.initTravelogueTestDataWithLike(liker);
        testHelper.initTravelogueTestData();

        // when & then
        assertThat(travelogueLikeService.findByLiker(liker, Pageable.ofSize(BASIC_PAGE_SIZE)))
                .hasSize(2);
    }

    @DisplayName("특정 여행기에 특정 멤버가 좋아요 했는지 알 수 있다")
    @Test
    void existByTravelogueAndMember() {
        Travelogue travelogue = testHelper.initTravelogueTestData();
        Member liker = testHelper.initKakaoMemberTestData();

        assertThat(travelogueLikeService.existByTravelogueAndMember(travelogue, liker)).isFalse();
    }

    @DisplayName("여행기에 좋아요를 할 수 있다.")
    @Test
    void likeTravelogue() {
        // given
        Travelogue travelogue = testHelper.initTravelogueTestData();
        Member liker = testHelper.initKakaoMemberTestData();

        // when
        travelogueLikeService.likeTravelogue(travelogue, liker);

        // then
        assertThat(travelogue.getLikeCount()).isEqualTo(1);
    }

    @DisplayName("여행기에 좋아요를 취소 할 수 있다.")
    @Test
    void unlikeTravelogue() {
        // given
        Member liker = testHelper.initKakaoMemberTestData();
        Travelogue travelogue = testHelper.initTravelogueTestDataWithLike(liker);

        // when
        travelogueLikeService.unlikeTravelogue(travelogue, liker);

        // then
        assertThat(travelogue.getLikeCount()).isEqualTo(0);
    }
}
