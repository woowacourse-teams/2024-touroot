package kr.touroot.travelplan.service;

import java.time.LocalDate;
import java.util.UUID;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ForbiddenException;
import kr.touroot.member.domain.Member;
import kr.touroot.member.repository.MemberRepository;
import kr.touroot.travelplan.domain.TravelPlan;
import kr.touroot.travelplan.dto.request.PlanRequest;
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

    @Transactional
    public TravelPlan save(TravelPlan travelPlan) {
        validateTravelPlanStartDate(travelPlan);
        return travelPlanRepository.save(travelPlan);
    }

    private void validateTravelPlanStartDate(TravelPlan travelPlan) {
        if (travelPlan.isStartDateBefore(LocalDate.now())) {
            throw new BadRequestException("지난 날짜에 대한 계획은 작성할 수 없습니다.");
        }
    }

    @Transactional(readOnly = true)
    public TravelPlan getTravelPlanById(Long planId, Member accessor) {
        TravelPlan travelPlan = travelPlanRepository.findById(planId)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행 계획입니다."));
        validateAccessFromAuthor(travelPlan, accessor);

        return travelPlan;
    }

    private void validateAccessFromAuthor(TravelPlan travelPlan, Member member) {
        if (!travelPlan.isAuthor(member)) {
            throw new ForbiddenException("여행 계획은 작성자만 접근 가능합니다.");
        }
    }

    public TravelPlan getTravelPlanByShareKey(UUID shareKey) {
        return travelPlanRepository.findByShareKey(shareKey)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행 계획입니다."));
    }

    @Transactional(readOnly = true)
    public Page<TravelPlan> getAllByAuthor(Member member, Pageable pageable) {
        return travelPlanRepository.findAllByAuthor(member, pageable);
    }


    @Transactional
    public TravelPlan updateTravelPlan(TravelPlan travelPlan, Member member, PlanRequest updateRequest) {
        validateAccessFromAuthor(travelPlan, member);
        travelPlan.updateDays(updateRequest.getDays(travelPlan));
        travelPlan.update(updateRequest.title(), updateRequest.startDate());
        return travelPlanRepository.save(travelPlan);
    }

    @Transactional
    public void deleteTravelPlan(TravelPlan travelPlan, Member author) {
        validateAccessFromAuthor(travelPlan, author);
        travelPlanRepository.delete(travelPlan);
    }
}
