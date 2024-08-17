package kr.touroot.travelogue.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.List;
import kr.touroot.tag.dto.TagResponse;
import kr.touroot.travelogue.domain.Travelogue;
import lombok.Builder;

@Builder
public record TravelogueResponse(
        @Schema(description = "여행기 ID", example = "1")
        Long id,
        @Schema(description = "여행기 제목", example = "서울 강남 여행기")
        String title,
        @Schema(description = "작성자 ID", example = "1")
        Long authorId,
        @Schema(description = "작성자 닉네임", example = "지니")
        String authorNickname,
        @Schema(description = "작성자 프로필 사진 URL", example = "https://dev.touroot.kr/images/profile.png")
        String authorProfileImageUrl,
        @Schema(description = "여행기 썸네일 링크", example = "https://dev.touroot.kr/images/thumbnail.png")
        String thumbnail,
        @Schema(description = "작성 날짜")
        LocalDate createdAt,
        @Schema(description = "여행기 태그")
        List<TagResponse> tags,
        @Schema(description = "여행기 일자 목록")
        List<TravelogueDayResponse> days,
        @Schema(description = "여행기 좋아요 숫자", example = "10")
        Long likeCount,
        @Schema(description = "사용자의 여행기 좋아요 여부", example = "true")
        Boolean isLiked
) {

    public static TravelogueResponse of(
            Travelogue travelogue,
            List<TravelogueDayResponse> days,
            List<TagResponse> tags,
            TravelogueLikeResponse like) {
        return TravelogueResponse.builder()
                .id(travelogue.getId())
                .createdAt(travelogue.getCreatedAt().toLocalDate())
                .authorId(travelogue.getAuthorId())
                .authorNickname(travelogue.getAuthorNickname())
                .authorProfileImageUrl(travelogue.getAuthorProfileImageUrl())
                .title(travelogue.getTitle())
                .thumbnail(travelogue.getThumbnail())
                .days(days)
                .tags(tags)
                .likeCount(like.likeCount())
                .isLiked(like.isLiked())
                .build();
    }
}
