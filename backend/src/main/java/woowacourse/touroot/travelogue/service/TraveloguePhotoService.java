package woowacourse.touroot.travelogue.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import woowacourse.touroot.travelogue.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.domain.TraveloguePlace;
import woowacourse.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import woowacourse.touroot.travelogue.repository.TraveloguePhotoRepository;

@RequiredArgsConstructor
@Service
public class TraveloguePhotoService {

    private final TraveloguePhotoRepository traveloguePhotoRepository;

    @Transactional
    public List<TraveloguePhoto> createPhotos(List<TraveloguePhotoRequest> requests, TraveloguePlace place) {
        List<TraveloguePhoto> photos = new ArrayList<>();

        for (int i = 0; i < requests.size(); i++) {
            TraveloguePhotoRequest request = requests.get(i);
            TraveloguePhoto photo = request.toTraveloguePhoto(i, place);
            photos.add(traveloguePhotoRepository.save(photo));
        }

        return photos;
    }

    @Transactional(readOnly = true)
    public List<String> findPhotoUrlsByPlace(TraveloguePlace traveloguePlace) {
        List<TraveloguePhoto> photos = traveloguePhotoRepository.findByTraveloguePlace(traveloguePlace);

        return photos.stream()
                .sorted(Comparator.comparing(TraveloguePhoto::getOrder))
                .map(TraveloguePhoto::getKey)
                .toList();
    }
}
