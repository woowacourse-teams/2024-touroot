package kr.touroot.travelogue.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;
import lombok.Builder;

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

    public static TraveloguePlaceResponse from(TraveloguePlace traveloguePlace) {
        return TraveloguePlaceResponse.builder()
                .id(traveloguePlace.getId())
                .placeName(traveloguePlace.getName())
                .description(traveloguePlace.getDescription())
                .position(TraveloguePositionResponse.from(traveloguePlace.getPosition()))
                .photoUrls(getTraveloguePhotosResponse(traveloguePlace))
                .build();
    }

    private static List<String> getTraveloguePhotosResponse(TraveloguePlace traveloguePlace) {
        return traveloguePlace.getTraveloguePhotos().stream()
                .map(TraveloguePhoto::getKey)
                .toList();
    }
}
