package kr.touroot.travelplan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.touroot.travelplan.domain.PlaceTodo;
import lombok.Builder;

@Builder
public record PlaceTodoResponse(
        @Schema(description = "TODO 아이디") Long id,
        @Schema(description = "TODO 내용") String content,
        @Schema(description = "TODO 순서") Integer order,
        @Schema(description = "TODO 체크 여부") Boolean checked
) {

    public static PlaceTodoResponse from(PlaceTodo placeTodo) {
        return PlaceTodoResponse.builder().
                id(placeTodo.getId())
                .content(placeTodo.getContent())
                .order(placeTodo.getOrder())
                .checked(placeTodo.getIsChecked())
                .build();
    }
}
