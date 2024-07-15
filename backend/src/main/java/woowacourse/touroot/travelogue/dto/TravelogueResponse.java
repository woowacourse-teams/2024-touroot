package woowacourse.touroot.travelogue.dto;

import java.util.List;
import woowacourse.touroot.travelogueday.dto.TravelogueDayResponse;

public record TravelogueResponse(String title, String thumbnail, List<TravelogueDayResponse> days) {
}
