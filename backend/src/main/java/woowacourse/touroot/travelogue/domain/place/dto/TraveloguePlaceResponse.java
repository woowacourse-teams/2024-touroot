package woowacourse.touroot.travelogue.domain.place.dto;

import java.util.List;
import lombok.Builder;

@Builder
public record TraveloguePlaceResponse(
        Long id,
        String name,
        String description,
        String lat,
        String lng,
        List<String> photoUrls
) {
}
