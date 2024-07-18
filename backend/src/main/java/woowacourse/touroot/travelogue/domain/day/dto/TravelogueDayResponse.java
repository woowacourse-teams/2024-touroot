package woowacourse.touroot.travelogue.domain.day.dto;

import java.util.List;
import lombok.Builder;
import woowacourse.touroot.travelogue.domain.place.dto.TraveloguePlaceResponse;

@Builder
public record TravelogueDayResponse(
        Long id,
        List<TraveloguePlaceResponse> places
) {
}
