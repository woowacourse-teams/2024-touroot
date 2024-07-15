package woowacourse.touroot.travelogue.dto;

import java.util.List;
import woowacourse.touroot.travelogueday.dto.TravelogueDayResponse;

public record TravelogueResponse(List<TravelogueDayResponse> days) {
}
