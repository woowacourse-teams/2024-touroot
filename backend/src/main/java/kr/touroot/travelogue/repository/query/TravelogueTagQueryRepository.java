package kr.touroot.travelogue.repository.query;

import kr.touroot.travelogue.domain.Travelogue;

public interface TravelogueTagQueryRepository {

    void deleteAllByTravelogue(Travelogue travelogue);
}
