package woowacourse.touroot.travelogue.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.Getter;
import woowacourse.touroot.entity.BaseEntity;
import woowacourse.touroot.travelogue.day.domain.TravelogueDay;

@Getter
@Entity
public class Travelogue extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String title;

    @Column(nullable = false)
    private String thumbnail;

    @OneToMany(mappedBy = "travelogue")
    private List<TravelogueDay> travelogueDays;
}
