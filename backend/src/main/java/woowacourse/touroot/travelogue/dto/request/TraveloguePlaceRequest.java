package woowacourse.touroot.travelogue.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.travelogue.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.TraveloguePlace;

public record TraveloguePlaceRequest(
        @Schema(description = "여행기 장소 이름", example = "선릉 캠퍼스")
        @NotNull(message = "여행기 장소 이름은 비어있을 수 없습니다.")
        String name,
        @Schema(description = "여행기 장소 위치 정보")
        @NotNull(message = "여행기 장소 위치 정보는 비어있을 수 없습니다.")
        @Valid
        TraveloguePositionRequest position,
        @Schema(description = "여행기 장소 설명", example = "성담 빌딩에 위치한 선릉 캠퍼스입니다.")
        String description,
        @Schema(description = "여행기 장소 사진")
        @NotNull(message = "여행기 장소 사진은 비어있을 수 없습니다.")
        @Valid
        List<TraveloguePhotoRequest> photos
) {

    public TraveloguePlace toTraveloguePlace(int order, Place place, TravelogueDay travelogueDay) {
        return new TraveloguePlace(order, description, place, travelogueDay);
    }

    public Place toPlace() {
        return new Place(name, position.lat(), position.lng());
    }
}
