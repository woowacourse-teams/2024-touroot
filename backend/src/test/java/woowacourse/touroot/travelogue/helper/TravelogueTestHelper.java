package woowacourse.touroot.travelogue.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.place.repository.PlaceRepository;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.domain.TraveloguePlace;
import woowacourse.touroot.travelogue.fixture.TravelogueTestFixture;
import woowacourse.touroot.travelogue.repository.TravelogueDayRepository;
import woowacourse.touroot.travelogue.repository.TraveloguePhotoRepository;
import woowacourse.touroot.travelogue.repository.TraveloguePlaceRepository;
import woowacourse.touroot.travelogue.repository.TravelogueRepository;

@Component
public class TravelogueTestHelper {

    private final PlaceRepository placeRepository;
    private final TravelogueRepository travelogueRepository;
    private final TravelogueDayRepository travelogueDayRepository;
    private final TraveloguePlaceRepository traveloguePlaceRepository;
    private final TraveloguePhotoRepository traveloguePhotoRepository;

    @Autowired
    public TravelogueTestHelper(
            PlaceRepository placeRepository,
            TravelogueRepository travelogueRepository,
            TravelogueDayRepository travelogueDayRepository,
            TraveloguePlaceRepository traveloguePlaceRepository,
            TraveloguePhotoRepository traveloguePhotoRepository
    ) {
        this.placeRepository = placeRepository;
        this.travelogueRepository = travelogueRepository;
        this.travelogueDayRepository = travelogueDayRepository;
        this.traveloguePlaceRepository = traveloguePlaceRepository;
        this.traveloguePhotoRepository = traveloguePhotoRepository;
    }

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
        return new TraveloguePhoto(order, key, traveloguePlace);
    }

    public void initTravelogueTestData() {
        Travelogue travelogue = persistTravelogue();
        TravelogueDay day = persistTravelogueDay(travelogue);
        Place location = persistPlace();
        TraveloguePlace place = persistTraveloguePlace(location, day);
        persistTraveloguePhoto(place);
    }

    public Travelogue persistTravelogue() {
        Travelogue travelogue = TravelogueTestFixture.getTravelogue();

        return travelogueRepository.save(travelogue);
    }

    public TravelogueDay persistTravelogueDay(Travelogue travelogue) {
        TravelogueDay day = TravelogueTestHelper.getTravelogueDay(1, travelogue);

        return travelogueDayRepository.save(day);
    }

    public Place persistPlace() {
        Place place = TravelogueTestFixture.getPlace();

        return placeRepository.save(place);
    }

    public TraveloguePlace persistTraveloguePlace(Place location, TravelogueDay day) {
        TraveloguePlace place = getTraveloguePlace(1, "극동의 진주, 블라디보스토크.", location, day);

        return traveloguePlaceRepository.save(place);
    }

    public TraveloguePhoto persistTraveloguePhoto(TraveloguePlace place) {
        TraveloguePhoto photo = getTraveloguePhoto("https://photo-key.jpeg", 1, place);

        return traveloguePhotoRepository.save(photo);
    }
}
