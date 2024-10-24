package kr.touroot.travelogue.service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueCountry;
import kr.touroot.travelogue.domain.search.CountryCode;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.repository.TravelogueCountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TravelogueCountryService {

    private final TravelogueCountryRepository travelogueCountryRepository;

    @Transactional
    public List<TravelogueCountry> createTravelogueCountries(Travelogue travelogue, TravelogueRequest request) {
        Map<CountryCode, Long> countryCounts = countCountries(request);

        return countryCounts.entrySet().stream()
                .map(entry -> travelogueCountryRepository.save(
                        new TravelogueCountry(travelogue, entry.getKey(), entry.getValue().intValue())))
                .toList();
    }

    private Map<CountryCode, Long> countCountries(TravelogueRequest request) {
        return request.days().stream()
                .flatMap(day -> day.places().stream())
                .map(place -> CountryCode.valueOf(place.countryCode()))
                .filter(countryCode -> countryCode != CountryCode.NONE)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
    }

    @Transactional(readOnly = true)
    public List<TravelogueCountry> getTravelogueCountryByTravelogue(Travelogue travelogue) {
        return travelogueCountryRepository.findAllByTravelogue(travelogue);
    }

    @Transactional
    public List<TravelogueCountry> updateTravelogueCountries(Travelogue travelogue, TravelogueRequest request) {
        deleteAllByTravelogue(travelogue);
        return createTravelogueCountries(travelogue, request);
    }

    @Transactional
    public void deleteAllByTravelogue(Travelogue travelogue) {
        travelogueCountryRepository.deleteAllByTravelogue(travelogue);
    }
}
