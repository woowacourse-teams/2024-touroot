package kr.touroot.travelogue.repository;

import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelogueRepository extends JpaRepository<Travelogue, Long> {

    Page<Travelogue> findAllByAuthor(Member author, Pageable pageable);
}
