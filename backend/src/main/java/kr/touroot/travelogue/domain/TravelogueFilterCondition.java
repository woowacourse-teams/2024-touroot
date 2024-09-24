package kr.touroot.travelogue.domain;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TravelogueFilterCondition {

    private final List<Long> tag;
    private final Integer period;

    public boolean isEmptyCondition() {
        return tag == null &&  period == null;
    }
}
