package woowacourse.touroot.travelogue.dto;

import lombok.Builder;

@Builder
public record TravelogueResponse(Long id, String title, String thumbnail) {
}
