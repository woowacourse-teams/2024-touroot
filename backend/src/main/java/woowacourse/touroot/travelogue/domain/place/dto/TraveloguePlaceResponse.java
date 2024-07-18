package woowacourse.touroot.travelogue.domain.place.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.Builder;

@Builder
public record TraveloguePlaceResponse(
        @Schema(description = "여행기 장소 ID", example = "1")
        @NotNull(message = "ID는 비어있을 수 없습니다.")
        Long id,
        @Schema(description = "여행기 장소 이름", example = "선릉 캠퍼스")
        @NotBlank(message = "여행기 장소 이름은 비어있을 수 없습니다.")
        String name,
        @Schema(description = "여행기 장소 설명", example = "성담 빌딩에 위치한 선릉 캠퍼스입니다.")
        @NotBlank(message = "여행기 장소 설명은 비어있을 수 없습니다.")
        String description,
        @Schema(description = "여행기 장소 위도", example = "37.5175896")
        @NotBlank(message = "여행기 장소 위도는 비어있을 수 없습니다.")
        String lat,
        @Schema(description = "여행기 장소 설명", example = "127.0867236")
        @NotBlank(message = "여행기 장소 경도는 비어있을 수 없습니다.")
        String lng,
        List<String> photoUrls
) {
}
