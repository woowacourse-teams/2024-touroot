package kr.touroot.travelplan.service;

import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ForbiddenException;
import kr.touroot.member.domain.Member;
import kr.touroot.member.repository.MemberRepository;
import kr.touroot.travelplan.domain.TravelPlaceTodo;
import kr.touroot.travelplan.dto.request.TodoStatusUpdateRequest;
import kr.touroot.travelplan.dto.response.PlanPlaceTodoResponse;
import kr.touroot.travelplan.repository.PlaceTodoQueryRepository;
import kr.touroot.travelplan.repository.PlaceTodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class PlaceTodoService {

    private final PlaceTodoRepository placeTodoRepository;
    private final PlaceTodoQueryRepository placeTodoQueryRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public PlanPlaceTodoResponse updateTodoStatus(
            Long id,
            MemberAuth memberAuth,
            TodoStatusUpdateRequest updateRequest
    ) {
        Member accessor = memberRepository.findById(memberAuth.memberId())
                .orElseThrow(() -> new BadRequestException("존재하지 않는 사용자입니다."));
        TravelPlaceTodo todo = placeTodoRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 TODO 입니다"));
        Member owner = placeTodoQueryRepository.findOwnerOf(todo)
                .orElseThrow(() -> new BadRequestException("TODO 작성자가 존재하지 않습니다"));

        if (!owner.equals(accessor)) {
            throw new ForbiddenException("TODO 체크는 작성자만 가능합니다");
        }

        todo.updateCheckedStatus(updateRequest.checked());
        return PlanPlaceTodoResponse.from(todo);
    }
}
