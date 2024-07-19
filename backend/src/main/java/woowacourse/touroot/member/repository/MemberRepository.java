package woowacourse.touroot.member.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import woowacourse.touroot.member.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByKakaoId(Long kakaoId);
}
