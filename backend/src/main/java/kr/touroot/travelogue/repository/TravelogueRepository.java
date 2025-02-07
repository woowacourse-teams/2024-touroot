package kr.touroot.travelogue.repository;

import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface TravelogueRepository extends JpaRepository<Travelogue, Long> {

    Page<Travelogue> findAllByAuthor(Member author, Pageable pageable);

    @Modifying
    @Transactional
    @Query("""
             UPDATE Travelogue t
             SET t.likeCount = (SELECT COUNT(*) FROM TravelogueLike l WHERE l.travelogue.id = t.id)
            """)
    void syncLikeCounts();
}
