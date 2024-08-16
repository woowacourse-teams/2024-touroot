package kr.touroot.travelplan.repository;

import java.util.Optional;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlaceTodo;
import org.springframework.data.repository.query.Param;

public interface PlaceTodoQueryRepository {

    Optional<Member> findOwnerOf(@Param("placeTodo") TravelPlaceTodo placeTodo);
}
