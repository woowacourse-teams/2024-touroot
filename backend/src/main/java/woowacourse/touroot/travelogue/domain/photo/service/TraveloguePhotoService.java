package woowacourse.touroot.travelogue.domain.photo.service;

import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import woowacourse.touroot.travelogue.domain.photo.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.domain.photo.repository.TraveloguePhotoRepository;
import woowacourse.touroot.travelogue.domain.place.domain.TraveloguePlace;
import woowacourse.touroot.travelogue.domain.place.repsitory.TraveloguePlaceRepository;

@RequiredArgsConstructor
@Service
public class TraveloguePhotoService {

    private final TraveloguePhotoRepository traveloguePhotoRepository;
    private final TraveloguePlaceRepository traveloguePlaceRepository;

    public List<String> findPhotoUrlsByPlaceId(Long traveloguePlaceId) {
        TraveloguePlace traveloguePlace = traveloguePlaceRepository.findById(traveloguePlaceId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 여행 장소입니다."));

        List<TraveloguePhoto> photos = traveloguePhotoRepository.findByTraveloguePlace(traveloguePlace);

        return photos.stream()
                .sorted(Comparator.comparing(TraveloguePhoto::getOrder))
                .map(TraveloguePhoto::getKey)
                .toList();
    }
}
