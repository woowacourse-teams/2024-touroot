package kr.touroot.travelogue.repository.query;

import kr.touroot.travelogue.domain.Travelogue;

public interface TravelogueLikeQueryRepository {

    void deleteAllByTravelogue(Travelogue travelogue);
}
