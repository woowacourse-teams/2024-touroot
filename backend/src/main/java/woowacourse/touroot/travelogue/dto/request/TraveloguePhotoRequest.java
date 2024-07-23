package woowacourse.touroot.travelogue.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import woowacourse.touroot.travelogue.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.domain.TraveloguePlace;

public record TraveloguePhotoRequest(
        @Schema(description = "여행기 장소 사진 Key", example = "photo.png")
        @NotNull(message = "여행기 장소 사진 Key 값은 비어있을 수 없습니다.")
        String key
) {

    public TraveloguePhoto toTraveloguePhoto(int order, TraveloguePlace traveloguePlace) {
        return new TraveloguePhoto(order, key, traveloguePlace);
    }
}