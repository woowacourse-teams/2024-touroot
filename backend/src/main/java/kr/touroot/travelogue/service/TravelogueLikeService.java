package kr.touroot.travelogue.service;

import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueLike;
import kr.touroot.travelogue.dto.response.TravelogueLikeResponse;
import kr.touroot.travelogue.repository.TravelogueLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TravelogueLikeService {

    private final TravelogueLikeRepository travelogueLikeRepository;

    @Transactional(readOnly = true)
    public TravelogueLikeResponse findLikeByTravelogue(Travelogue travelogue) {
        return new TravelogueLikeResponse(false, travelogueLikeRepository.countByTravelogue(travelogue));
    }

    @Transactional(readOnly = true)
    public TravelogueLikeResponse findLikeByTravelogueAndLiker(Travelogue travelogue, Member liker) {
        boolean exists = travelogueLikeRepository.existsByTravelogueAndLiker(travelogue, liker);
        return new TravelogueLikeResponse(exists, travelogueLikeRepository.countByTravelogue(travelogue));
    }

    @Transactional
    public TravelogueLikeResponse likeTravelogue(Travelogue travelogue, Member liker) {
        boolean notExists = !travelogueLikeRepository.existsByTravelogueAndLiker(travelogue, liker);
        if (notExists) {
            TravelogueLike travelogueLike = new TravelogueLike(travelogue, liker);
            travelogueLikeRepository.save(travelogueLike);
        }

        return new TravelogueLikeResponse(true, travelogueLikeRepository.countByTravelogue(travelogue));
    }

    @Transactional
    public TravelogueLikeResponse unlikeTravelogue(Travelogue travelogue, Member liker) {
        boolean exists = travelogueLikeRepository.existsByTravelogueAndLiker(travelogue, liker);
        if (exists) {
            travelogueLikeRepository.deleteByTravelogueAndLiker(travelogue, liker);
        }

        return new TravelogueLikeResponse(false, travelogueLikeRepository.countByTravelogue(travelogue));
    }
}
