package kr.touroot.travelogue.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;

public record TraveloguePhotoRequest(
        @Schema(description = "여행기 장소 사진 URL", example = "photo.png")
        @NotNull(message = "여행기 장소 사진 URL 값은 비어있을 수 없습니다.")
        String url
) {
}