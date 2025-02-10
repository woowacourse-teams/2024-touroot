package kr.touroot.travelogue.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import kr.touroot.global.exception.BadRequestException;
import kr.touroot.travelogue.domain.search.CountryCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@EqualsAndHashCode(of = "id", callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
public class TravelogueCountry {

    private static final int MIN_COUNT = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Travelogue travelogue;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CountryCode countryCode;

    @Column(nullable = false)
    private Integer count;

    public TravelogueCountry(Travelogue travelogue, CountryCode countryCode, Integer count) {
        validate(travelogue, countryCode, count);
        this.travelogue = travelogue;
        this.countryCode = countryCode;
        this.count = count;
    }


    private void validate(Travelogue travelogue, CountryCode countryCode, Integer count) {
        validateNotNull(travelogue, countryCode, count);
        validateCount(count);
    }

    private void validateNotNull(Travelogue travelogue, CountryCode countryCode, Integer count) {
        if (travelogue == null || countryCode == null || count == null) {
            throw new BadRequestException("여행기와 국가 코드, 국가 코드의 count 는 null 일 수 없습니다.");
        }
    }

    private void validateCount(Integer count) {
        if (count < MIN_COUNT) {
            throw new BadRequestException(String.format("국가 코드의 개수는 %d 보다 커야합니다.", MIN_COUNT));
        }
    }
}
