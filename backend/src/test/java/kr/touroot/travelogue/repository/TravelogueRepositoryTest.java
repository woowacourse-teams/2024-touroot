package kr.touroot.travelogue.repository;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import kr.touroot.global.AbstractRepositoryIntegrationTest;
import kr.touroot.member.domain.Member;
import kr.touroot.member.fixture.MemberFixture;
import kr.touroot.member.repository.MemberRepository;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueLike;
import kr.touroot.travelogue.fixture.TravelogueFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class TravelogueRepositoryTest extends AbstractRepositoryIntegrationTest {

    @Autowired
    private TravelogueLikeRepository travelogueLikeRepository;
    @Autowired
    private TravelogueRepository travelogueRepository;
    @Autowired
    private MemberRepository memberRepository;

    @DisplayName("실제 좋아요 정보와 여행기에 저장된 좋아요 개수를 동기화한다")
    @Test
    void synchronizeTravelogueLikeCount() {
        // given
        Member travelogueOwner = MemberFixture.KAKAO_MEMBER.getMember();
        Member liker = MemberFixture.TOUROOT_LOCAL_USER.getMember();
        memberRepository.save(travelogueOwner);
        memberRepository.save(liker);

        Travelogue travelogue = TravelogueFixture.JEJU_TRAVELOGUE.getTravelogueOwnedBy(travelogueOwner);
        travelogueRepository.save(travelogue);

        travelogueLikeRepository.save(new TravelogueLike(travelogue, liker));

        // when
        travelogueRepository.syncLikeCounts();

        // then
        assertThat(travelogueRepository.findById(travelogue.getId()).get().getLikeCount()).isOne();
    }
}
