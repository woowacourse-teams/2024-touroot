package kr.touroot.travelogue.repository.query;

import kr.touroot.travelogue.domain.Travelogue;

public interface TraveloguePlaceQueryRepository {

    void deleteAllByTravelogue(Travelogue travelogue);
}
