package woowacourse.touroot.travelogue.day.dto;

import java.util.List;
import woowacourse.touroot.travelogue.place.dto.TraveloguePlaceResponse;

public record TravelogueDayResponse(List<TraveloguePlaceResponse> places) {
}
