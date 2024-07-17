package woowacourse.touroot.travelogue.place.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.Getter;
import woowacourse.touroot.entity.BaseEntity;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.travelogue.day.domain.TravelogueDay;
import woowacourse.touroot.travelogue.photo.domain.TraveloguePhoto;

@Getter
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

    @OneToMany(mappedBy = "traveloguePlace")
    private List<TraveloguePhoto> traveloguePhotos;
}
