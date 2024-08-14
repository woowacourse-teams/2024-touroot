package kr.touroot.travelogue.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import kr.touroot.place.domain.Place;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePlace;

public record TraveloguePlaceUpdateRequest(
        @Schema(description = "여행기 장소 ID", example = "1")
        @NotNull(message = "수정하려는 여행기 장소 ID는 비어있을 수 없습니다.")
        Long id,
        @Schema(description = "여행기 장소 이름", example = "선릉 캠퍼스")
        @NotBlank(message = "여행기 장소 이름은 비어있을 수 없습니다.")
        @Size(message = "장소 이름은 60자를 초과할 수 없습니다", max = 60)
        String placeName,
        @Schema(description = "여행기 장소 위치 정보")
        @NotNull(message = "여행기 장소 위치 정보는 비어있을 수 없습니다.")
        @Valid
        TraveloguePositionRequest position,
        @Schema(description = "여행기 장소 설명", example = "성담 빌딩에 위치한 선릉 캠퍼스입니다.")
        @Size(message = "장소 설명은 300글자 이하입니다.", max = 300)
        String description,
        @Schema(description = "여행기 장소 사진")
        @Size(message = "여행기 장소 사진은 최대 10개입니다.", max = 10)
        @Valid
        List<TraveloguePhotoRequest> photoUrls
) {

    public TraveloguePlace toTraveloguePlace(int i, Place place, TravelogueDay day) {
        return new TraveloguePlace(id, i, description, place, day);
    }

    public Place toPlace() {
        return new Place(placeName, position.lat(), position.lng());
    }
}
