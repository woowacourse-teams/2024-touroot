package kr.touroot.travelogue.service;

import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueLike;
import kr.touroot.travelogue.dto.response.TravelogueLikeResponse;
import kr.touroot.travelogue.repository.TravelogueLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TravelogueLikeService {

    private final TravelogueLikeRepository travelogueLikeRepository;

    public TravelogueLikeResponse likeTravelogue(Travelogue travelogue, Member liker) {
        TravelogueLike travelogueLike = new TravelogueLike(travelogue, liker);
        travelogueLikeRepository.save(travelogueLike);

        return new TravelogueLikeResponse(true, travelogueLikeRepository.countByTravelogue(travelogue));
    }
}
