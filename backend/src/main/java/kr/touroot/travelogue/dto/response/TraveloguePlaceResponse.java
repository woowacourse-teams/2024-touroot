package kr.touroot.travelogue.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;
import kr.touroot.travelogue.domain.TraveloguePlace;

@Builder
public record TraveloguePlaceResponse(
        @Schema(description = "여행기 장소 ID", example = "1")
        Long id,
        @Schema(description = "여행기 장소 이름", example = "선릉 캠퍼스")
        String placeName,
        @Schema(description = "여행기 장소 설명", example = "성담 빌딩에 위치한 선릉 캠퍼스입니다.")
        String description,
        TraveloguePositionResponse position,
        List<String> photoUrls
) {

    public static TraveloguePlaceResponse of(TraveloguePlace place, List<String> photoUrls) {
        return TraveloguePlaceResponse.builder()
                .id(place.getId())
                .placeName(place.getName())
                .description(place.getDescription())
                .position(TraveloguePositionResponse.from(place))
                .photoUrls(photoUrls)
                .build();
    }
}
