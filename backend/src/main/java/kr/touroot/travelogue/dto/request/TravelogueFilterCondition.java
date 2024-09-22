package kr.touroot.travelogue.dto.request;

import java.util.List;

public record TravelogueFilterCondition(List<Long> tag, Integer period) {

    public boolean isNoCondition() {
        return tag == null && period == null;
    }
}
