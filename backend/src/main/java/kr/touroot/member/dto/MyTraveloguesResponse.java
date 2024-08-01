package kr.touroot.member.dto;

import kr.touroot.travelogue.domain.Travelogue;
import lombok.Builder;

import java.time.format.DateTimeFormatter;

@Builder
public record MyTraveloguesResponse(long id, String title, String thumbnailUrl, String createdAt) {

    public static MyTraveloguesResponse from(Travelogue travelogue) {
        String createdAt = travelogue.getCreatedAt()
                .toLocalDate()
                .format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));

        return MyTraveloguesResponse.builder()
                .id(travelogue.getId())
                .title(travelogue.getTitle())
                .createdAt(createdAt)
                .thumbnailUrl(travelogue.getThumbnail())
                .build();
    }
}
