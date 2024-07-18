package woowacourse.touroot.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.place.repository.PlaceRepository;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.day.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.day.repository.TravelogueDayRepository;
import woowacourse.touroot.travelogue.domain.photo.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.domain.photo.repository.TraveloguePhotoRepository;
import woowacourse.touroot.travelogue.domain.place.domain.TraveloguePlace;
import woowacourse.touroot.travelogue.domain.place.repsitory.TraveloguePlaceRepository;
import woowacourse.touroot.travelogue.repository.TravelogueRepository;

@Component
@Profile("test")
public class TestFixture {

    @Autowired
    TravelogueRepository travelogueRepository;

    @Autowired
    TravelogueDayRepository travelogueDayRepository;

    @Autowired
    TraveloguePlaceRepository traveloguePlaceRepository;

    @Autowired
    TraveloguePhotoRepository traveloguePhotoRepository;
    
    @Autowired
    private PlaceRepository placeRepository;

    public static Travelogue getTravelogue(String name, String thumbnail) {
        return new Travelogue(name, thumbnail);
    }

    public static TravelogueDay getTravelogueDay(Integer order, Travelogue travelogue) {
        return new TravelogueDay(order, travelogue);
    }

    public static Place getPlace(String name, String latitude, String longitude, String googlePlaceId) {
        return new Place(name, latitude, longitude, googlePlaceId);
    }

    public static TraveloguePlace getTraveloguePlace(Integer order, String description, Place place,
                                                     TravelogueDay travelogueDay) {
        return new TraveloguePlace(order, description, place, travelogueDay);
    }

    public static TraveloguePhoto getTraveloguePhoto(String key, Integer order, TraveloguePlace traveloguePlace) {
        return new TraveloguePhoto(key, order, traveloguePlace);
    }

    public void initTravelogueTestData() {
        Travelogue travelogue = getTravelogue("여행기 1", "썸네일.png");
        TravelogueDay travelogueDay = getTravelogueDay(1, travelogue);
        Place place = getPlace("장소 1", "33.3333", "127.2727", "");
        TraveloguePlace traveloguePlace = getTraveloguePlace(1, "좋은 장소", place, travelogueDay);
        TraveloguePhoto traveloguePhoto = getTraveloguePhoto("image", 1, traveloguePlace);

        travelogueRepository.save(travelogue);
        travelogueDayRepository.save(travelogueDay);
        placeRepository.save(place);
        traveloguePlaceRepository.save(traveloguePlace);
        traveloguePhotoRepository.save(traveloguePhoto);
    }
}
