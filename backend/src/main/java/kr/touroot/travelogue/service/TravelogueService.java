package kr.touroot.travelogue.service;

import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ForbiddenException;
import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueFilterCondition;
import kr.touroot.travelogue.domain.search.SearchCondition;
import kr.touroot.travelogue.domain.search.SearchType;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.dto.request.TravelogueSearchRequest;
import kr.touroot.travelogue.repository.TravelogueRepository;
import kr.touroot.travelogue.repository.query.TravelogueQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TravelogueService {

    private final TravelogueRepository travelogueRepository;
    private final TravelogueQueryRepository travelogueQueryRepository;

    @Transactional
    public Travelogue save(Travelogue travelogue) {
        return travelogueRepository.save(travelogue);
    }

    @Transactional(readOnly = true)
    public Travelogue getTravelogueById(Long id) {
        return travelogueRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행기입니다."));
    }

    @Transactional(readOnly = true)
    public Page<Travelogue> findAllByMember(Member member, Pageable pageable) {
        return travelogueRepository.findAllByAuthor(member, pageable);
    }

    // TODO: 프론트엔드 엔드포인트 이전 작업 완료 후 제거
    @Transactional(readOnly = true)
    public Page<Travelogue> findByKeyword(TravelogueSearchRequest request, Pageable pageable) {
        SearchType searchType = SearchType.from(request.searchType());
        SearchCondition searchCondition = new SearchCondition(request.keyword(), searchType);
        if (searchCondition.isNoneCountry()) {
            return Page.empty();
        }

        return travelogueQueryRepository.findAllBySearchCondition(searchCondition, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Travelogue> findAll(
            SearchCondition searchCondition,
            TravelogueFilterCondition filter,
            Pageable pageable
    ) {
        if (searchCondition.isNoneCountry()) {
            return Page.empty();
        }

        if (filter.isEmptyCondition() && searchCondition.isEmptyCondition()) {
            return travelogueRepository.findAll(pageable);
        }

        return travelogueQueryRepository.findAllByCondition(searchCondition, filter, pageable);
    }

    @Transactional
    public Travelogue update(Long id, Member author, TravelogueRequest request) {
        Travelogue travelogue = getTravelogueById(id);
        validateAuthor(travelogue, author);

        travelogue.updateDays(request.getTravelogueDays(travelogue));
        travelogue.update(request.title(), request.thumbnail());

        return travelogue;
    }

    @Transactional
    public void delete(Travelogue travelogue, Member author) {
        validateAuthor(travelogue, author);
        travelogueRepository.delete(travelogue);
    }

    private void validateAuthor(Travelogue travelogue, Member author) {
        if (!travelogue.isAuthor(author)) {
            throw new ForbiddenException("본인이 작성한 여행기만 수정하거나 삭제할 수 있습니다.");
        }
    }
}
