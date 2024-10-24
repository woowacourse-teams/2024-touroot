package kr.touroot.travelogue.repository;

import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueLike;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelogueLikeRepository extends JpaRepository<TravelogueLike, Long> {

    Page<TravelogueLike> findAllByLiker(Member liker, Pageable pageable);

    boolean existsByTravelogueAndLiker(Travelogue travelogue, Member liker);

    void deleteAllByTravelogue(Travelogue travelogue);

    void deleteByTravelogueAndLiker(Travelogue travelogue, Member liker);
}
