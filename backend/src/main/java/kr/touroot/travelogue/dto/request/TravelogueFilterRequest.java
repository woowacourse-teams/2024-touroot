package kr.touroot.travelogue.dto.request;

import java.util.List;
import kr.touroot.travelogue.domain.TravelogueFilterCondition;

public record TravelogueFilterRequest(List<Long> tag, Integer period) {

    public TravelogueFilterCondition toFilterCondition() {
        return new TravelogueFilterCondition(tag, period);
    }
}
