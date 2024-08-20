package kr.touroot.travelogue.repository.query;

import kr.touroot.travelogue.domain.Travelogue;

public interface TravelogueDayQueryRepository {

    void deleteAllByTravelogue(Travelogue travelogue);
}
