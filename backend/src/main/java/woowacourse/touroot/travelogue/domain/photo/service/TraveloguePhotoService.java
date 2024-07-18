package woowacourse.touroot.travelogue.domain.photo.service;

import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import woowacourse.touroot.travelogue.domain.photo.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.domain.photo.repository.TraveloguePhotoRepository;
import woowacourse.touroot.travelogue.domain.place.domain.TraveloguePlace;

@RequiredArgsConstructor
@Service
public class TraveloguePhotoService {

    private final TraveloguePhotoRepository traveloguePhotoRepository;

    public List<String> findPhotoUrlsByPlace(TraveloguePlace traveloguePlace) {
        List<TraveloguePhoto> photos = traveloguePhotoRepository.findByTraveloguePlace(traveloguePlace);

        return photos.stream()
                .sorted(Comparator.comparing(TraveloguePhoto::getOrder))
                .map(TraveloguePhoto::getKey)
                .toList();
    }
}
