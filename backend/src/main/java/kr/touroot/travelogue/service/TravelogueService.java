package kr.touroot.travelogue.service;

import kr.touroot.global.exception.BadRequestException;
import kr.touroot.image.infrastructure.AwsS3Provider;
import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
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
}
