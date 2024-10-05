package kr.touroot.travelplan.service;

import java.time.LocalDate;
import java.util.UUID;
import kr.touroot.global.auth.dto.MemberAuth;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ForbiddenException;
import kr.touroot.member.domain.Member;
import kr.touroot.member.repository.MemberRepository;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.dto.request.PlanRequest;
import kr.touroot.travelplan.dto.response.PlanCreateResponse;
import kr.touroot.travelplan.dto.response.PlanResponse;
import kr.touroot.travelplan.repository.PlaceTodoRepository;
import kr.touroot.travelplan.repository.TravelPlanDayRepository;
import kr.touroot.travelplan.repository.TravelPlanPlaceRepository;
import kr.touroot.travelplan.repository.TravelPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TravelPlanService {

    private final MemberRepository memberRepository;
    private final TravelPlanRepository travelPlanRepository;
    private final TravelPlanDayRepository travelPlanDayRepository;
    private final TravelPlanPlaceRepository travelPlanPlaceRepository;
    private final PlaceTodoRepository placeTodoRepository;

    @Transactional
    public PlanCreateResponse createTravelPlan(PlanRequest request, MemberAuth memberAuth) {
        Member author = getMemberByMemberAuth(memberAuth);
        TravelPlan travelPlan = request.toTravelPlan(author, UUID.randomUUID());
        validateTravelPlanStartDate(travelPlan);

        TravelPlan savedTravelPlan = travelPlanRepository.save(travelPlan);

        return PlanCreateResponse.from(savedTravelPlan);
    }

    private void validateTravelPlanStartDate(TravelPlan travelPlan) {
        if (travelPlan.isStartDateBefore(LocalDate.now())) {
            throw new BadRequestException("지난 날짜에 대한 계획은 작성할 수 없습니다.");
        }
    }

    private Member getMemberByMemberAuth(MemberAuth memberAuth) {
        return memberRepository.findById(memberAuth.memberId())
                .orElseThrow(() -> new BadRequestException("존재하지 않는 사용자입니다."));
    }

    @Transactional(readOnly = true)
    public PlanResponse readTravelPlan(Long planId, MemberAuth memberAuth) {
        TravelPlan travelPlan = getTravelPlanById(planId);
        Member member = getMemberByMemberAuth(memberAuth);
        validateReadByAuthor(travelPlan, member);

        return PlanResponse.from(travelPlan);
    }

    private void validateReadByAuthor(TravelPlan travelPlan, Member member) {
        if (!travelPlan.isAuthor(member)) {
            throw new ForbiddenException("여행 계획 조회는 작성자만 가능합니다.");
        }
    }

    @Transactional(readOnly = true)
    public PlanResponse readTravelPlan(UUID shareKey) {
        TravelPlan travelPlan = getTravelPlanByShareKey(shareKey);

        return PlanResponse.from(travelPlan);
    }

    private TravelPlan getTravelPlanById(Long planId) {
        return travelPlanRepository.findById(planId)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행 계획입니다."));
    }

    private TravelPlan getTravelPlanByShareKey(UUID shareKey) {
        return travelPlanRepository.findByShareKey(shareKey)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행 계획입니다."));
    }

    @Transactional(readOnly = true)
    public Page<TravelPlan> getAllByAuthor(Member member, Pageable pageable) {
        return travelPlanRepository.findAllByAuthor(member, pageable);
    }

    @Transactional
    public PlanCreateResponse updateTravelPlan(Long planId, MemberAuth memberAuth, PlanRequest request) {
        TravelPlan travelPlan = getTravelPlanById(planId);
        Member author = getMemberByMemberAuth(memberAuth);
        validateUpdateByAuthor(travelPlan, author);

        clearTravelPlanContents(travelPlan);

        updateTravelPlanContents(request, travelPlan);
        return new PlanCreateResponse(travelPlan.getId());
    }

    private void validateUpdateByAuthor(TravelPlan travelPlan, Member member) {
        if (!travelPlan.isAuthor(member)) {
            throw new ForbiddenException("여행 계획 수정은 작성자만 가능합니다.");
        }
    }

    private void clearTravelPlanContents(TravelPlan travelPlan) {
        placeTodoRepository.deleteByTravelPlanPlaceDayPlan(travelPlan);
        travelPlanPlaceRepository.deleteByDayPlan(travelPlan);
        travelPlanDayRepository.deleteByPlan(travelPlan);
    }

    private void updateTravelPlanContents(PlanRequest request, TravelPlan travelPlan) {
        travelPlan.update(request.title(), request.startDate());
        travelPlan.updateDays(request.getDays(travelPlan));
        travelPlanRepository.save(travelPlan);
    }

    @Transactional
    public void deleteByTravelPlanId(Long planId, MemberAuth memberAuth) {
        TravelPlan travelPlan = getTravelPlanById(planId);
        Member author = getMemberByMemberAuth(memberAuth);
        validateDeleteByAuthor(travelPlan, author);

        placeTodoRepository.deleteByTravelPlanPlaceDayPlan(travelPlan);
        travelPlanPlaceRepository.deleteByDayPlan(travelPlan);
        travelPlanDayRepository.deleteByPlan(travelPlan);
        travelPlanRepository.delete(travelPlan);
    }

    private void validateDeleteByAuthor(TravelPlan travelPlan, Member member) {
        if (!travelPlan.isAuthor(member)) {
            throw new ForbiddenException("여행 계획 삭제는 작성자만 가능합니다.");
        }
    }
}
