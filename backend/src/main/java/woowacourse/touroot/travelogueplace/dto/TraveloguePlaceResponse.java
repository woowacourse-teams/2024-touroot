package woowacourse.touroot.travelogueplace.dto;

import java.util.List;

public record TraveloguePlaceResponse(
        String name,
        List<String> photoUrls,
        String description,
        String latitude,
        String longitude
) {
}
