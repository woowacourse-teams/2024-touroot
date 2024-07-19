package woowacourse.touroot.travelogue.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import woowacourse.touroot.travelogue.domain.photo.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.domain.place.domain.TraveloguePlace;

public record TraveloguePhotoRequest(
        @Schema(description = "여행기 장소 위도", example = "37.5175896")
        @NotNull(message = "여행기 장소 위도는 비어있을 수 없습니다.")
        String key
) {

    public TraveloguePhoto toTraveloguePhoto(int order, TraveloguePlace traveloguePlace) {
        return new TraveloguePhoto(order, key, traveloguePlace);
    }
}
