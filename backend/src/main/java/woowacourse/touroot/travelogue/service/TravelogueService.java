package woowacourse.touroot.travelogue.service;

import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import woowacourse.touroot.travelogue.day.domain.TravelogueDay;
import woowacourse.touroot.travelogue.day.dto.TravelogueDayResponse;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.dto.TravelogueResponse;
import woowacourse.touroot.travelogue.photo.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.place.domain.TraveloguePlace;
import woowacourse.touroot.travelogue.place.dto.TraveloguePlaceResponse;
import woowacourse.touroot.travelogue.repository.TravelogueRepository;

@RequiredArgsConstructor
@Service
public class TravelogueService {

    private final TravelogueRepository travelogueRepository;

    @Transactional(readOnly = true)
    public TravelogueResponse findTravelogueById(Long id) {
        Travelogue travelogue = travelogueRepository.findById(id).get();

        return new TravelogueResponse(travelogue.getTitle(), travelogue.getThumbnail(), getDayResponses(travelogue));
    }

    private List<TravelogueDayResponse> getDayResponses(Travelogue travelogue) {
        return travelogue.getTravelogueDays()
                .stream()
                .sorted(Comparator.comparing(TravelogueDay::getOrder))
                .map(travelogueDay -> new TravelogueDayResponse(getPlaceResponses(travelogueDay)))
                .toList();
    }

    private List<TraveloguePlaceResponse> getPlaceResponses(TravelogueDay day) {
        return day.getTraveloguePlaces()
                .stream()
                .sorted(Comparator.comparing(TraveloguePlace::getOrder))
                .map(traveloguePlace -> new TraveloguePlaceResponse(
                        traveloguePlace.getPlace().getName(),
                        getPhotoUrls(traveloguePlace),
                        traveloguePlace.getDescription(),
                        traveloguePlace.getPlace().getLatitude(),
                        traveloguePlace.getPlace().getLongitude()
                ))
                .toList();
    }

    private List<String> getPhotoUrls(TraveloguePlace traveloguePlace) {
        return traveloguePlace.getTraveloguePhotos()
                .stream()
                .sorted(Comparator.comparing(TraveloguePhoto::getOrder))
                .map(TraveloguePhoto::getKey)
                .toList();
    }
}
