package kr.touroot.travelogue.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import kr.touroot.global.entity.BaseEntity;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.place.domain.Place;
import kr.touroot.position.domain.Position;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE travelogue_place SET deleted_at = NOW() WHERE id = ?")
@SQLRestriction("deleted_at IS NULL")
@Entity
public class TraveloguePlace extends BaseEntity {

    private static final int PLACE_NAME_MAX_LENGTH = 85;
    private static final int MAX_DESCRIPTION_LENGTH = 300;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PLACE_ORDER", nullable = false)
    private Integer order;

    @Column(columnDefinition = "VARCHAR(300)")
    private String description;

    @Column(nullable = false)
    private String name;

    @Embedded
    private Position position;

    @ManyToOne(fetch = FetchType.LAZY)
    private Place place;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private TravelogueDay travelogueDay;

    @OneToMany(mappedBy = "traveloguePlace", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TraveloguePhoto> traveloguePhotos = new ArrayList<>();

    public TraveloguePlace(
            Long id,
            Integer order,
            String description,
            String name,
            Position position,
            TravelogueDay travelogueDay
    ) {
        validate(order, description, name, position, travelogueDay);
        this.id = id;
        this.order = order;
        this.description = description;
        this.name = name;
        this.position = position;
        this.travelogueDay = travelogueDay;
    }

    public TraveloguePlace(
            Integer order,
            String description,
            String name,
            String latitude,
            String longitude,
            TravelogueDay travelogueDay
    ) {
        this(null, order, description, name, new Position(latitude, longitude), travelogueDay);
    }

    private void validate(
            Integer order,
            String description,
            String name,
            Position coordinate,
            TravelogueDay travelogueDay
    ) {
        validateNotNull(order, name, coordinate, travelogueDay);
        validateNotBlank(name);
        validateOrderRange(order);
        validateDescriptionLength(description);
        validatePlaceNameLength(name);
    }

    private void validateNotNull(Integer order, String name, Position coordinate, TravelogueDay day) {
        if (order == null || name == null || coordinate == null || day == null) {
            throw new BadRequestException("여행기 장소에서 순서와 장소 위치, 그리고 방문 날짜는 비어 있을 수 없습니다");
        }
    }

    private void validateNotBlank(String name) {
        if (name.isBlank()) {
            throw new BadRequestException("장소 이름은 비어 있을 수 없습니다");
        }
    }

    private void validateOrderRange(Integer order) {
        if (order < 0) {
            throw new BadRequestException("여행 장소의 순서는 음수일 수 없습니다");
        }
    }

    private void validateDescriptionLength(String description) {
        if (description != null && description.length() > MAX_DESCRIPTION_LENGTH) {
            throw new BadRequestException("여행 장소에 대한 설명은 " + MAX_DESCRIPTION_LENGTH + "자를 넘길 수 없습니다");
        }
    }

    private void validatePlaceNameLength(String placeName) {
        if (placeName.length() > PLACE_NAME_MAX_LENGTH) {
            throw new BadRequestException("장소 이름은 " + PLACE_NAME_MAX_LENGTH + "자 이하여야 합니다");
        }
    }

    public void addPhoto(TraveloguePhoto photo) {
        traveloguePhotos.add(photo);
        photo.updateTraveloguePlace(this);
    }

    public void updateTravelogueDay(TravelogueDay travelogueDay) {
        this.travelogueDay = travelogueDay;
    }
}
