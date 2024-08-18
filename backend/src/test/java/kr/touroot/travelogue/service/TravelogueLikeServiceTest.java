package kr.touroot.travelogue.service;

import static org.assertj.core.api.Assertions.assertThat;

import kr.touroot.global.ServiceTest;
import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.dto.response.TravelogueLikeResponse;
import kr.touroot.travelogue.helper.TravelogueTestHelper;
import kr.touroot.utils.DatabaseCleaner;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;

@DisplayName("여행기 좋아요 서비스")
@Import(value = {TravelogueLikeService.class, TravelogueTestHelper.class})
@ServiceTest
class TravelogueLikeServiceTest {

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

    @DisplayName("여행기를 기반으로 좋아요 정보를 조회할 수 있다.")
    @Test
    void findLikeByTravelogue() {
        // given
        Member liker = testHelper.initKakaoMemberTestData();
        Travelogue travelogue = testHelper.initTravelogueTestDataWithLike(liker);

        // when
        TravelogueLikeResponse response = travelogueLikeService.findLikeByTravelogue(travelogue);

        // then
        assertThat(response).isEqualTo(new TravelogueLikeResponse(false, 1L));
    }

    @DisplayName("여행기와 좋아요 한 사람을 기반으로 좋아요 정보를 조회할 수 있다.")
    @Test
    void findLikeByTravelogueAndLiker() {
        // given
        Member liker = testHelper.initKakaoMemberTestData();
        Travelogue travelogue = testHelper.initTravelogueTestDataWithLike(liker);

        // when
        TravelogueLikeResponse response = travelogueLikeService.findLikeByTravelogueAndLiker(travelogue, liker);

        // then
        assertThat(response).isEqualTo(new TravelogueLikeResponse(true, 1L));
    }

    @DisplayName("여행기에 좋아요를 할 수 있다.")
    @Test
    void likeTravelogue() {
        // given
        Travelogue travelogue = testHelper.initTravelogueTestData();
        Member liker = testHelper.initKakaoMemberTestData();

        // when
        TravelogueLikeResponse response = travelogueLikeService.likeTravelogue(travelogue, liker);

        // then
        assertThat(response).isEqualTo(new TravelogueLikeResponse(true, 1L));
    }

    @DisplayName("여행기에 좋아요를 취소 할 수 있다.")
    @Test
    void unlikeTravelogue() {
        // given
        Member liker = testHelper.initKakaoMemberTestData();
        Travelogue travelogue = testHelper.initTravelogueTestDataWithLike(liker);

        // when
        TravelogueLikeResponse response = travelogueLikeService.unlikeTravelogue(travelogue, liker);

        // then
        assertThat(response).isEqualTo(new TravelogueLikeResponse(false, 0L));
    }
}
