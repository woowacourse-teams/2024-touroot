package woowacourse.touroot.travelogueplace.domain;

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
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.travelogueday.domain.TravelogueDay;
import woowacourse.touroot.traveloguephoto.domain.TraveloguePhoto;

@Getter
@Entity
public class TraveloguePlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer order;

    private String description;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Place place;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TravelogueDay day;

    @OneToMany(mappedBy = "traveloguePlace")
    private List<TraveloguePhoto> photos;
}
