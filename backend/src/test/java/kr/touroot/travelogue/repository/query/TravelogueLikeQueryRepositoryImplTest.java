package kr.touroot.travelogue.repository.query;

import static org.assertj.core.api.Assertions.assertThat;

import kr.touroot.global.AbstractRepositoryIntegrationTest;
import kr.touroot.member.domain.Member;
import kr.touroot.member.fixture.MemberFixture;
import kr.touroot.member.repository.MemberRepository;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueLike;
import kr.touroot.travelogue.fixture.TravelogueFixture;
import kr.touroot.travelogue.repository.TravelogueLikeRepository;
import kr.touroot.travelogue.repository.TravelogueRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DisplayName("TravelogueLikeQueryRepositoryImpl 테스트")
class TravelogueLikeQueryRepositoryImplTest extends AbstractRepositoryIntegrationTest {

    @Autowired
    private TravelogueLikeQueryRepository travelogueLikeQueryRepository;
    @Autowired
    private TravelogueLikeRepository travelogueLikeRepository;
    @Autowired
    private TravelogueRepository travelogueRepository;
    @Autowired
    private MemberRepository memberRepository;

    @DisplayName("좋아요 수가 특정 순위에 해당하는 게시물의 좋아요 개수를 반환한다.")
    @Test
    void countTravelougeLikeByRank() {
        // given
        Member member = MemberFixture.KAKAO_MEMBER.getMember();
        memberRepository.save(member);

        Travelogue likedTravelogue = TravelogueFixture.JEJU_TRAVELOGUE.getTravelogueOwnedBy(member);
        Travelogue unlikedTravelogue = TravelogueFixture.JEJU_TRAVELOGUE.getTravelogueOwnedBy(member);
        travelogueRepository.save(likedTravelogue);
        travelogueRepository.save(unlikedTravelogue);

        travelogueLikeRepository.save(new TravelogueLike(likedTravelogue, member));
        // when & then
        Assertions.assertAll(
                () -> assertThat(travelogueLikeQueryRepository.countTravelougeLikeByRank(1)).isOne(),
                () -> assertThat(travelogueLikeQueryRepository.countTravelougeLikeByRank(2)).isZero(),
                () -> assertThat(travelogueLikeQueryRepository.countTravelougeLikeByRank(20)).isZero()
        );
    }
}
