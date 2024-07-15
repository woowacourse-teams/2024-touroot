package woowacourse.touroot.travelogueday.dto;

import java.util.List;
import woowacourse.touroot.travelogueplace.dto.TraveloguePlaceResponse;

public record TravelogueDayResponse(List<TraveloguePlaceResponse> places) {
}
