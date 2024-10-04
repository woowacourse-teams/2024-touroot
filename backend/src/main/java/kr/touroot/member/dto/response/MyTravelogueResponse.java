package kr.touroot.member.dto.response;

import java.time.format.DateTimeFormatter;
import kr.touroot.travelogue.domain.Travelogue;
import lombok.Builder;

@Builder
public record MyTravelogueResponse(long id, String title, String thumbnailUrl, String createdAt) {

    public static MyTravelogueResponse from(Travelogue travelogue) {
        String createdAt = travelogue.getCreatedAt()
                .toLocalDate()
                .format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));

        return MyTravelogueResponse.builder()
                .id(travelogue.getId())
                .title(travelogue.getTitle())
                .createdAt(createdAt)
                .thumbnailUrl(travelogue.getThumbnail())
                .build();
    }
}
