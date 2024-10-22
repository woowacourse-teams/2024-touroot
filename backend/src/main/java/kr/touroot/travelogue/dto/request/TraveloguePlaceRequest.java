package kr.touroot.travelogue.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;

public record TraveloguePlaceRequest(
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
        @NotNull(message = "여행기 장소 사진은 null일 수 없습니다.")
        @Size(message = "여행기 장소 사진은 최대 10개입니다.", max = 10)
        @Valid
        List<TraveloguePhotoRequest> photoUrls,
        @Schema(description = "여행기 장소 국가 코드", example = "KR")
        @NotBlank(message = "여행기 장소 국가 코드는 비어있을 수 없습니다.")
        String countryCode
) {

    public TraveloguePlace toTraveloguePlace(int order, TravelogueDay travelogueDay) {
        TraveloguePlace traveloguePlace = new TraveloguePlace(
                order,
                description,
                placeName,
                position().lat(),
                position().lng(),
                travelogueDay,
                countryCode
        );
        addTraveloguePhotos(traveloguePlace);
        return traveloguePlace;
    }

    private void addTraveloguePhotos(TraveloguePlace traveloguePlace) {
        for (int photoOrder = 0; photoOrder < photoUrls.size(); photoOrder++) {
            TraveloguePhotoRequest traveloguePhotoRequest = photoUrls.get(photoOrder);
            TraveloguePhoto traveloguePhoto = traveloguePhotoRequest.toTraveloguePhoto(photoOrder, traveloguePlace);
            traveloguePlace.addPhoto(traveloguePhoto);
        }
    }
}
