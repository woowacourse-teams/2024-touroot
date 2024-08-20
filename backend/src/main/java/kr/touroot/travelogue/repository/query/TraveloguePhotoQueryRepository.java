package kr.touroot.travelogue.repository.query;

import kr.touroot.travelogue.domain.Travelogue;

public interface TraveloguePhotoQueryRepository {

    void deleteAllByTravelogue(Travelogue travelogue);
}
