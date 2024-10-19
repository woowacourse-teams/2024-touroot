package kr.touroot.travelogue.service;

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

@RequiredArgsConstructor
@Service
public class TravelogueCountryService {

    private final TravelogueCountryRepository travelogueCountryRepository;

    public void createTravelogueCountries(Travelogue travelogue, TravelogueRequest request) {
        Map<CountryCode, Long> countryCounts = countCountries(request);

        countryCounts.forEach((countryCode, count) -> travelogueCountryRepository.save(
                new TravelogueCountry(travelogue, countryCode, count)));
    }

    private Map<CountryCode, Long> countCountries(TravelogueRequest request) {
        return request.days().stream()
                .flatMap(day -> day.places().stream())
                .map(place -> CountryCode.valueOf(place.countryCode()))
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
    }

    public void updateTravelogueCountries(Travelogue travelogue, TravelogueRequest request) {
        deleteAllByTravelogue(travelogue);
        createTravelogueCountries(travelogue, request);
    }

    public void deleteAllByTravelogue(Travelogue travelogue) {
        travelogueCountryRepository.deleteAllByTravelogue(travelogue);
    }
}
