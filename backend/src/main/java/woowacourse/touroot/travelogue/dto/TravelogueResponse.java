package woowacourse.touroot.travelogue.dto;

import java.util.List;
import lombok.Builder;
import woowacourse.touroot.travelogue.domain.day.dto.TravelogueDayResponse;

@Builder
public record TravelogueResponse(
        Long id,
        String title,
        String thumbnail,
        List<TravelogueDayResponse> days
) {
}
