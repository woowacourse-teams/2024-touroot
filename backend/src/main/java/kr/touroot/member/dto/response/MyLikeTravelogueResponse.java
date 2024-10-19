package kr.touroot.member.dto.response;

import java.time.format.DateTimeFormatter;
import kr.touroot.travelogue.domain.Travelogue;
import lombok.Builder;

@Builder
public record MyLikeTravelogueResponse(
        long id,
        String title,
        String thumbnailUrl,
        String createdAt,
        String authorName,
        String authorProfileImageUrl) {

    public static MyLikeTravelogueResponse from(Travelogue travelogue) {
        String createdAt = travelogue.getCreatedAt()
                .toLocalDate()
                .format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));

        return MyLikeTravelogueResponse.builder()
                .id(travelogue.getId())
                .title(travelogue.getTitle())
                .thumbnailUrl(travelogue.getThumbnail())
                .createdAt(createdAt)
                .authorName(travelogue.getAuthorNickname())
                .authorProfileImageUrl(travelogue.getAuthorProfileImageUrl())
                .build();
    }
}
