package kr.touroot.travelogue.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import kr.touroot.tag.domain.Tag;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
public class TravelogueTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "TRAVELOGUE_ID", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Travelogue travelogue;

    @JoinColumn(name = "TAG_ID", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Tag tag;

    public TravelogueTag(Travelogue travelogue, Tag tag) {
        this(null, travelogue, tag);
    }
}
