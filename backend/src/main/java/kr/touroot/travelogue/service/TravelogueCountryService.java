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

    @Transactional(readOnly = true)
    public List<TravelogueCountry> readCountryByTravelogue(Travelogue travelogue) {
        return travelogueCountryRepository.findAllByTravelogue(travelogue);
    }

    @Transactional
    public void createTravelogueCountries(Travelogue travelogue, TravelogueRequest request) {
        Map<CountryCode, Long> countryCounts = countCountries(request);

        countryCounts.forEach((countryCode, count) -> travelogueCountryRepository.save(
                new TravelogueCountry(travelogue, countryCode, count.intValue())));
    }

    private Map<CountryCode, Long> countCountries(TravelogueRequest request) {
        return request.days().stream()
                .flatMap(day -> day.places().stream())
                .map(place -> CountryCode.valueOf(place.countryCode()))
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
    }

    @Transactional
    public void updateTravelogueCountries(Travelogue travelogue, TravelogueRequest request) {
        deleteAllByTravelogue(travelogue);
        createTravelogueCountries(travelogue, request);
    }

    @Transactional
    public void deleteAllByTravelogue(Travelogue travelogue) {
        travelogueCountryRepository.deleteAllByTravelogue(travelogue);
    }
}
