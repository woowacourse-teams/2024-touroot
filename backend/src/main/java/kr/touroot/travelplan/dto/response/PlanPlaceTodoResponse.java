package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.touroot.travelplan.domain.TravelPlaceTodo;
import lombok.Builder;

@Builder
public record PlanPlaceTodoResponse(
        @Schema(description = "TODO 아이디") Long id,
        @Schema(description = "TODO 내용") String content,
        @Schema(description = "TODO 순서") Integer order,
        @Schema(description = "TODO 체크 여부") Boolean checked
) {

    public static PlanPlaceTodoResponse from(TravelPlaceTodo travelPlaceTodo) {
        return PlanPlaceTodoResponse.builder().
                id(travelPlaceTodo.getId())
                .content(travelPlaceTodo.getContent())
                .order(travelPlaceTodo.getOrder())
                .checked(travelPlaceTodo.getIsChecked())
                .build();
    }
}
