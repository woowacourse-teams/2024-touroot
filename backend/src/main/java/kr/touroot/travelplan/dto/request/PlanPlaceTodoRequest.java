package kr.touroot.travelplan.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import kr.touroot.travelplan.domain.TravelPlaceTodo;
import kr.touroot.travelplan.domain.TravelPlanPlace;

public record PlanPlaceTodoRequest(
        @Schema(description = "여행 장소에서 진행할 TODO", example = "함덕 해수욕장 산책")
        @NotBlank(message = "TODO 내용은 비어 있을 수 없습니다")
        @Size(min = 1, max = 20, message = "TODO 내용은 1자에서 20자 사이의 길이를 가져야 합니다")
        String content,
        @Schema(description = "TODO의 체크 여부", example = "true")
        @NotNull(message = "TODO의 체크 여부는 비어 있을 수 없습니다.")
        Boolean isChecked
) {

    public TravelPlaceTodo toPlaceTodo(TravelPlanPlace travelPlanPlace, Integer order) {
        return new TravelPlaceTodo(travelPlanPlace, content, order, isChecked);
    }
}
