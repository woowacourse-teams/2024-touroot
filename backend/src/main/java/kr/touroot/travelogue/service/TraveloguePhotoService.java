package kr.touroot.travelogue.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.repository.TraveloguePhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TraveloguePhotoService {

    private final TraveloguePhotoRepository traveloguePhotoRepository;

    public List<TraveloguePhoto> createPhotos(List<TraveloguePhotoRequest> requests, TraveloguePlace place) {
        List<TraveloguePhoto> photos = new ArrayList<>();

        for (int i = 0; i < requests.size(); i++) {
            TraveloguePhotoRequest request = requests.get(i);
            TraveloguePhoto photo = request.toTraveloguePhoto(i, place);
            photos.add(traveloguePhotoRepository.save(photo));
        }

        return photos;
    }

    public List<String> findPhotoUrlsByPlace(TraveloguePlace traveloguePlace) {
        List<TraveloguePhoto> photos = traveloguePhotoRepository.findByTraveloguePlace(traveloguePlace);

        return photos.stream()
                .sorted(Comparator.comparing(TraveloguePhoto::getOrder))
                .map(TraveloguePhoto::getKey)
                .toList();
    }
}
