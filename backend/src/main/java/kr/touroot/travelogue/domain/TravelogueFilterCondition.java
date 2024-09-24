package kr.touroot.travelogue.domain;

import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TravelogueFilterCondition {

    public static final int MAX_PERIOD_BOUNDARY = 8;

    private final List<Long> tag;
    private final Integer period;

    public boolean isEmptyTagCondition() {
        return tag == null;
    }

    public boolean isEmptyPeriodCondition() {
        return period == null;
    }

    public boolean isEmptyCondition() {
        return isEmptyTagCondition() && isEmptyPeriodCondition();
    }

    public boolean isMaxPeriod() {
        return period == MAX_PERIOD_BOUNDARY;
    }
}
