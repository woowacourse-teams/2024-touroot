package kr.touroot.travelogue.service;

import kr.touroot.global.exception.BadRequestException;
import kr.touroot.global.exception.ForbiddenException;
import kr.touroot.image.infrastructure.AwsS3Provider;
import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.repository.TravelogueQueryRepository;
import kr.touroot.travelogue.repository.TravelogueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TravelogueService {

    private final TravelogueRepository travelogueRepository;
    private final AwsS3Provider s3Provider;
    private final TravelogueQueryRepository travelogueQueryRepository;

    public Travelogue createTravelogue(Member author, TravelogueRequest request) {
        String url = s3Provider.copyImageToPermanentStorage(request.thumbnail());
        Travelogue travelogue = request.toTravelogueOf(author, url);
        return travelogueRepository.save(travelogue);
    }

    public Travelogue getTravelogueById(Long id) {
        return travelogueRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("존재하지 않는 여행기입니다."));
    }

    public Page<Travelogue> findAll(Pageable pageable) {
        return travelogueRepository.findAll(pageable);
    }

    public Page<Travelogue> findAllByMember(Member member, Pageable pageable) {
        return travelogueRepository.findAllByAuthor(member, pageable);
    }

    public Page<Travelogue> findByKeyword(String keyword, Pageable pageable) {
        return travelogueQueryRepository.findByTitleContaining(keyword, pageable);
    }

    public void delete(Travelogue travelogue, Member author) {
        validateDeleteByAuthor(travelogue, author);
        travelogueRepository.delete(travelogue);
    }

    public void validateDeleteByAuthor(Travelogue travelogue, Member author) {
        if (!travelogue.isAuthor(author)) {
            throw new ForbiddenException("여행기 삭제는 작성자만 가능합니다.");
        }
    }
}
