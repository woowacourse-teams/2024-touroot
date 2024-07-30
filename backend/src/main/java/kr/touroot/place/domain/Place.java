package kr.touroot.place.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import kr.touroot.global.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
