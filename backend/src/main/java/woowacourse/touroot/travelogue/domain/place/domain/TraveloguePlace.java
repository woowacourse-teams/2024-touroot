package woowacourse.touroot.travelogue.domain.place.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import woowacourse.touroot.entity.BaseEntity;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.travelogue.domain.day.domain.TravelogueDay;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
public class TraveloguePlace extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PLACE_ORDER", nullable = false)
    private Integer order;

    private String description;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Place place;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TravelogueDay travelogueDay;

    public TraveloguePlace(Integer order, String description, Place place, TravelogueDay travelogueDay) {
        this(null, order, description, place, travelogueDay);
    }

    public String getName() {
        return place.getName();
    }

    public String getLatitude() {
        return place.getLatitude();
    }

    public String getLongitude() {
        return place.getLongitude();
    }
}
