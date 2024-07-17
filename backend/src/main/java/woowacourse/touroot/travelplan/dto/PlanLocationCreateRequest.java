package woowacourse.touroot.travelplan.dto;

import jakarta.validation.constraints.NotNull;

public record PlanLocationCreateRequest(
        @NotNull(message = "위도는 비어있을 수 없습니다.") String lat,
        @NotNull(message = "경도는 비어있을 수 없습니다.") String lng
) {
}
