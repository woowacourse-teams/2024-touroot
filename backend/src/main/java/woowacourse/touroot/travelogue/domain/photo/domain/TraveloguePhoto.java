package woowacourse.touroot.travelogue.domain.photo.domain;

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
import woowacourse.touroot.travelogue.domain.place.domain.TraveloguePlace;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
public class TraveloguePhoto extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PHOTO_KEY", nullable = false)
    private String key;

    @Column(name = "PHOTO_ORDER", nullable = false)
    private Integer order;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TraveloguePlace traveloguePlace;

    public TraveloguePhoto(String key, Integer order, TraveloguePlace traveloguePlace) {
        this(null, key, order, traveloguePlace);
    }
}
