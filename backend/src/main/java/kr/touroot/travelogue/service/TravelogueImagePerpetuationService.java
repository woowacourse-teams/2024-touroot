package kr.touroot.travelogue.service;

import kr.touroot.image.infrastructure.AwsS3Provider;
import kr.touroot.travelogue.domain.Travelogue;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TravelogueImagePerpetuationService {

    private final AwsS3Provider awsS3Provider;

    public void copyTravelogueImagesToPermanentStorage(Travelogue travelogue) {
        copyThumbnailToPermanentStorage(travelogue);
        copyPlacePhotosToPermanentStorage(travelogue);
    }

    private void copyThumbnailToPermanentStorage(Travelogue travelogue) {
        String thumbnail = awsS3Provider.copyImageToPermanentStorage(travelogue.getThumbnail());
        travelogue.updateThumbnail(thumbnail);
    }

    private void copyPlacePhotosToPermanentStorage(Travelogue travelogue) {
        travelogue.getTravelogueDays().stream()
                .flatMap(day -> day.getTraveloguePlaces().stream())
                .flatMap(place -> place.getTraveloguePhotos().stream())
                .forEach(photo -> photo.updateKey(awsS3Provider.copyImageToPermanentStorage(photo.getKey())));
    }
}
