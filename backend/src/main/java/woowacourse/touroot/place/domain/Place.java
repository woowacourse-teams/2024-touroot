package woowacourse.touroot.place.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import woowacourse.touroot.entity.BaseEntity;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
public class Place extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String latitude;

    @Column(nullable = false)
    private String longitude;

    private String googlePlaceId;

    public Place(String name, String latitude, String longitude, String googlePlaceId) {
        this(null, name, latitude, longitude, googlePlaceId);
    }
    
    public Place(String name, String latitude, String longitude) {
        this(null, name, latitude, longitude, null);
    }
}
