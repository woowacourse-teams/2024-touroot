package kr.touroot.tag.repository;

import kr.touroot.tag.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {

    boolean existsByTag(String tag);
}
