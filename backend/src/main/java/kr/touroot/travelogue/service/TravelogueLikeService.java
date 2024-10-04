package kr.touroot.travelogue.service;

import kr.touroot.member.domain.Member;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueLike;
import kr.touroot.travelogue.repository.TravelogueLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TravelogueLikeService {

    private final TravelogueLikeRepository travelogueLikeRepository;

    //TODO: test
    @Transactional(readOnly = true)
    public boolean existByTravelogueAndMember(Travelogue travelogue, Member liker) {
        return travelogueLikeRepository.existsByTravelogueAndLiker(travelogue, liker);
    }

    @Transactional
    public void likeTravelogue(Travelogue travelogue, Member liker) {
        boolean notExists = !travelogueLikeRepository.existsByTravelogueAndLiker(travelogue, liker);
        if (notExists) {
            TravelogueLike travelogueLike = new TravelogueLike(travelogue, liker);
            travelogueLikeRepository.save(travelogueLike);
            travelogue.increaseLikeCount();
        }
    }

    @Transactional
    public void unlikeTravelogue(Travelogue travelogue, Member liker) {
        boolean exists = travelogueLikeRepository.existsByTravelogueAndLiker(travelogue, liker);
        if (exists) {
            travelogueLikeRepository.deleteByTravelogueAndLiker(travelogue, liker);
            travelogue.decreaseLikeCount();
        }
    }

    @Transactional
    public void deleteAllByTravelogue(Travelogue travelogue) {
        travelogueLikeRepository.deleteAllByTravelogue(travelogue);
    }
}
