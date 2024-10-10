package kr.touroot.travelplan.repository;

import kr.touroot.travelplan.domain.TravelPlaceTodo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceTodoRepository extends JpaRepository<TravelPlaceTodo, Long> {
}
