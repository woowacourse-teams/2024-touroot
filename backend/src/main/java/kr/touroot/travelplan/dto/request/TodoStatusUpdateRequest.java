package kr.touroot.travelplan.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record TodoStatusUpdateRequest(
        @Schema(description = "업데이트 하고자 하는 체크 상태", example = "true")
        @NotNull
        Boolean checked
) {
}
