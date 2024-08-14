package kr.touroot.travelplan.service;

import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.member.domain.Member;
import kr.touroot.travelplan.domain.TravelPlaceTodo;
import kr.touroot.travelplan.dto.request.TodoStatusUpdateRequest;
import kr.touroot.travelplan.dto.response.PlanPlaceTodoResponse;
import kr.touroot.travelplan.repository.PlaceTodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class PlaceTodoService {

    private final PlaceTodoRepository placeTodoRepository;

    @Transactional
    public PlanPlaceTodoResponse updateTodoStatus(Long id, MemberAuth memberAuth,
                                                  TodoStatusUpdateRequest updateRequest) {
        TravelPlaceTodo todo = placeTodoRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 TODO 입니다"));
        Member owner = placeTodoRepository.findOwnerOf(todo)
                .orElseThrow(() -> new BadRequestException("TODO 작성자가 존재하지 않습니다"));

        if (!owner.hasId(memberAuth.memberId())) {
            throw new BadRequestException("TODO 체크는 작성자만 가능합니다");
        }

        todo.updateCheckedStatus(updateRequest.checked());
        return PlanPlaceTodoResponse.from(todo);
    }
}