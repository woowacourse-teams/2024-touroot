package woowacourse.touroot.travelogue.helper;

import static woowacourse.touroot.place.fixture.PlaceFixture.PLACE;
import static woowacourse.touroot.travelogue.fixture.TravelogueDayFixture.TRAVELOGUE_DAY;
import static woowacourse.touroot.travelogue.fixture.TravelogueFixture.TRAVELOGUE;
import static woowacourse.touroot.travelogue.fixture.TraveloguePhotoFixture.TRAVELOGUE_PHOTO;
import static woowacourse.touroot.travelogue.fixture.TraveloguePlaceFixture.TRAVELOGUE_PLACE;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.place.repository.PlaceRepository;
import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.domain.TraveloguePlace;
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

    public void initTravelogueTestData() {
        Travelogue travelogue = persistTravelogue();
        TravelogueDay day = persistTravelogueDay(travelogue);
        Place position = persistPlace();
        TraveloguePlace place = persistTraveloguePlace(position, day);
        persistTraveloguePhoto(place);
    }

    public Travelogue persistTravelogue() {
        Travelogue travelogue = TRAVELOGUE.get();

        return travelogueRepository.save(travelogue);
    }

    public TravelogueDay persistTravelogueDay(Travelogue travelogue) {
        TravelogueDay day = TRAVELOGUE_DAY.create(1, travelogue);

        return travelogueDayRepository.save(day);
    }

    public Place persistPlace() {
        Place place = PLACE.get();

        return placeRepository.save(place);
    }

    public TraveloguePlace persistTraveloguePlace(Place position, TravelogueDay day) {
        TraveloguePlace place = TRAVELOGUE_PLACE.create(position, day);

        return traveloguePlaceRepository.save(place);
    }

    public TraveloguePhoto persistTraveloguePhoto(TraveloguePlace place) {
        TraveloguePhoto photo = TRAVELOGUE_PHOTO.create(place);

        return traveloguePhotoRepository.save(photo);
    }
}
