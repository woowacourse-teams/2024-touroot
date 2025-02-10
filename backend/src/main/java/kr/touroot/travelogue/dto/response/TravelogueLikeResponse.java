package kr.touroot.travelogue.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record TravelogueLikeResponse(
        @Schema(description = "사용자의 좋아요 여부", example = "true")
        Boolean isLiked,
        @Schema(description = "여행기의 좋아요 수", example = "10")
        Long likeCount
) {
}
