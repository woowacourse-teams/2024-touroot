package kr.touroot.travelogue.dto.response;

import kr.touroot.travelogue.domain.Travelogue;
import lombok.Builder;

@Builder
public record TravelogueSimpleResponse(Long id, String title, String thumbnail, String author, String authorProfileUrl) {

    public static TravelogueSimpleResponse from(Travelogue travelogue) {
        return TravelogueSimpleResponse.builder()
                .id(travelogue.getId())
                .title(travelogue.getTitle())
                .thumbnail(travelogue.getThumbnail())
                .author(travelogue.getAuthorNickname())
                .authorProfileUrl(travelogue.getAuthorProfileImageUrl())
                .build();
    }
}
